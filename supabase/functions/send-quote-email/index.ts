import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'

// --- CORS Configuration ---
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// --- Environment Configuration ---
const config = {
  postmarkToken: Deno.env.get('POSTMARK_API_KEY'),
  supabaseUrl: Deno.env.get('SUPABASE_URL'),
  supabaseServiceKey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
  primaryRecipient: 'dumpsterdiverz@gmail.com',
  ccRecipients: ['nate@trashjoes.com', 'payton@trashjoes.com'],
}

// --- Fail Fast on Missing Config ---
if (!config.postmarkToken || !config.supabaseUrl || !config.supabaseServiceKey) {
  console.error('[CRITICAL-CONFIG-ERROR] Missing one or more required environment variables.')
}

const supabase = createClient(config.supabaseUrl!, config.supabaseServiceKey!)

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_type: string;
  address?: string;
  message?: string;
  created_at: string;
}

async function sendEmail(to: string, cc: string[], subject: string, htmlBody: string) {
  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': config.postmarkToken!,
    },
    body: JSON.stringify({
      From: 'noreply@trashjoes.com',
      To: to,
      Cc: cc.join(','),
      Subject: subject,
      HtmlBody: htmlBody,
      MessageStream: 'outbound',
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Postmark error: ${JSON.stringify(result)}`)
  }

  return result
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record: quoteRequest } = await req.json() as { record: QuoteRequest }
    console.log(`[INFO] New quote request received: ${quoteRequest.id}`)

    const subject = `New Quote Request: ${quoteRequest.service_type} - ${quoteRequest.name}`
    const htmlBody = `
      <h2>New Quote Request</h2>
      <p><strong>Quote ID:</strong> ${quoteRequest.id}</p>
      <p><strong>Submitted:</strong> ${new Date(quoteRequest.created_at).toLocaleString()}</p>

      <h3>Customer Info</h3>
      <p><strong>Name:</strong> ${quoteRequest.name}</p>
      <p><strong>Email:</strong> ${quoteRequest.email}</p>
      <p><strong>Phone:</strong> ${quoteRequest.phone || 'N/A'}</p>
      <p><strong>Address:</strong> ${quoteRequest.address || 'N/A'}</p>

      <h3>Service Info</h3>
      <p><strong>Type:</strong> ${quoteRequest.service_type}</p>
      <p><strong>Message:</strong> ${quoteRequest.message || 'No message provided'}</p>

      <hr>
      <p><em>Dumpster Diverz Quote Notification</em></p>
    `

    try {
      const result = await sendEmail(config.primaryRecipient, config.ccRecipients, subject, htmlBody)
      console.log(`[SUCCESS] Email sent. MessageID: ${result.MessageID}`)

      await supabase.from('quote_requests').update({
        email_status: 'sent',
        email_sent_at: new Date().toISOString(),
        postmark_message_id: result.MessageID,
      }).eq('id', quoteRequest.id)

      return new Response(JSON.stringify({ success: true, messageId: result.MessageID }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })

    } catch (emailError) {
      console.error(`[ERROR] Failed to send quote email: ${emailError.message}`)

      await supabase.from('quote_requests').update({
        email_status: 'failed',
        email_error_message: emailError.message,
        email_attempted_at: new Date().toISOString(),
      }).eq('id', quoteRequest.id)

      // Try sending error alert to CC list
      try {
        const errorSubject = `🚨 Failed Quote Email: ${quoteRequest.id}`
        const errorBody = `
          <h3>Failed to Send Quote Email</h3>
          <p><strong>Quote ID:</strong> ${quoteRequest.id}</p>
          <p><strong>Error:</strong> ${emailError.message}</p>
          <p><strong>Customer:</strong> ${quoteRequest.name} - ${quoteRequest.email}</p>
          <hr><p><em>Quote Error Alert System</em></p>
        `
        await sendEmail(config.primaryRecipient, config.ccRecipients, errorSubject, errorBody)
        console.log(`[INFO] Admins notified of quote failure.`)
      } catch (failNotifyError) {
        console.error(`[CRITICAL] Could not notify admins: ${failNotifyError.message}`)
      }

      return new Response(JSON.stringify({ success: false, error: 'Email sending failed.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

  } catch (err) {
    console.error('[CRITICAL] Server error:', err.message)
    return new Response(JSON.stringify({ success: false, error: 'Server processing error.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
