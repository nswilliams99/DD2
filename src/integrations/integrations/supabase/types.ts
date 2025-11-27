export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      calculator_question_options: {
        Row: {
          created_at: string
          id: string
          option_description: string | null
          option_label: string
          option_value: string
          project_type_filter: string | null
          question_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          option_description?: string | null
          option_label: string
          option_value: string
          project_type_filter?: string | null
          question_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          option_description?: string | null
          option_label?: string
          option_value?: string
          project_type_filter?: string | null
          question_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculator_question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "calculator_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      calculator_questions: {
        Row: {
          created_at: string
          id: string
          is_required: boolean
          question_order: number
          question_text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_required?: boolean
          question_order: number
          question_text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_required?: boolean
          question_order?: number
          question_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      calculator_ui_content: {
        Row: {
          content_description: string | null
          content_key: string
          content_value: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          content_description?: string | null
          content_key: string
          content_value: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          content_description?: string | null
          content_key?: string
          content_value?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      color_palettes: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          is_default: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_default?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      color_variables: {
        Row: {
          category: string | null
          created_at: string
          css_variable_name: string
          description: string | null
          hsl_value: string
          id: string
          palette_id: string
          sort_order: number | null
          updated_at: string
          variable_name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          css_variable_name: string
          description?: string | null
          hsl_value: string
          id?: string
          palette_id: string
          sort_order?: number | null
          updated_at?: string
          variable_name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          css_variable_name?: string
          description?: string | null
          hsl_value?: string
          id?: string
          palette_id?: string
          sort_order?: number | null
          updated_at?: string
          variable_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_variables_palette_id_fkey"
            columns: ["palette_id"]
            isOneToOne: false
            referencedRelation: "color_palettes"
            referencedColumns: ["id"]
          },
        ]
      }
      commercial_faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string | null
          embedding: string | null
          id: string
          is_active: boolean | null
          question: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          is_active?: boolean | null
          question: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          is_active?: boolean | null
          question?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      commercial_sizes: {
        Row: {
          capacity_bags: number
          created_at: string
          description: string
          dimensions: string
          embedding: string | null
          faqs: Json | null
          features: Json | null
          hero_alt_text: string | null
          hero_image_url: string | null
          id: string
          ideal_for: string[]
          is_active: boolean
          pickup_options: string[]
          pricing_range: string | null
          size_label: string
          size_value: number
          sort_order: number | null
          specifications: Json | null
          title: string
          updated_at: string
          weight_limit: number
        }
        Insert: {
          capacity_bags: number
          created_at?: string
          description: string
          dimensions: string
          embedding?: string | null
          faqs?: Json | null
          features?: Json | null
          hero_alt_text?: string | null
          hero_image_url?: string | null
          id?: string
          ideal_for: string[]
          is_active?: boolean
          pickup_options: string[]
          pricing_range?: string | null
          size_label: string
          size_value: number
          sort_order?: number | null
          specifications?: Json | null
          title: string
          updated_at?: string
          weight_limit: number
        }
        Update: {
          capacity_bags?: number
          created_at?: string
          description?: string
          dimensions?: string
          embedding?: string | null
          faqs?: Json | null
          features?: Json | null
          hero_alt_text?: string | null
          hero_image_url?: string | null
          id?: string
          ideal_for?: string[]
          is_active?: boolean
          pickup_options?: string[]
          pricing_range?: string | null
          size_label?: string
          size_value?: number
          sort_order?: number | null
          specifications?: Json | null
          title?: string
          updated_at?: string
          weight_limit?: number
        }
        Relationships: []
      }
      commercial_specs: {
        Row: {
          capacity: string
          created_at: string
          dimensions: string
          id: string
          ideal_use: string
          is_active: boolean
          label: string
          size_slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          capacity: string
          created_at?: string
          dimensions: string
          id?: string
          ideal_use: string
          is_active?: boolean
          label: string
          size_slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          capacity?: string
          created_at?: string
          dimensions?: string
          id?: string
          ideal_use?: string
          is_active?: boolean
          label?: string
          size_slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      competitor_reviews: {
        Row: {
          author_name: string | null
          content: string | null
          content_embedding: string | null
          created_at: string | null
          hauler_id: string
          id: string
          is_flagged: boolean | null
          rating: number | null
          review_date: string | null
          source: string | null
        }
        Insert: {
          author_name?: string | null
          content?: string | null
          content_embedding?: string | null
          created_at?: string | null
          hauler_id: string
          id?: string
          is_flagged?: boolean | null
          rating?: number | null
          review_date?: string | null
          source?: string | null
        }
        Update: {
          author_name?: string | null
          content?: string | null
          content_embedding?: string | null
          created_at?: string | null
          hauler_id?: string
          id?: string
          is_flagged?: boolean | null
          rating?: number | null
          review_date?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_reviews_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competitor_reviews_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
        ]
      }
      competitor_scraped_pages: {
        Row: {
          content: string | null
          content_embedding: string | null
          created_at: string | null
          detected_keywords: string[] | null
          h1: string | null
          id: string
          meta_description: string | null
          page_type: string | null
          structured_data: Json | null
          title_tag: string | null
          url: string | null
          website_id: string
          word_count: number | null
        }
        Insert: {
          content?: string | null
          content_embedding?: string | null
          created_at?: string | null
          detected_keywords?: string[] | null
          h1?: string | null
          id?: string
          meta_description?: string | null
          page_type?: string | null
          structured_data?: Json | null
          title_tag?: string | null
          url?: string | null
          website_id: string
          word_count?: number | null
        }
        Update: {
          content?: string | null
          content_embedding?: string | null
          created_at?: string | null
          detected_keywords?: string[] | null
          h1?: string | null
          id?: string
          meta_description?: string | null
          page_type?: string | null
          structured_data?: Json | null
          title_tag?: string | null
          url?: string | null
          website_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_scraped_pages_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "competitor_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      competitor_seo_insights: {
        Row: {
          competitor_ids: string[] | null
          content_gap_summary: string | null
          created_at: string | null
          hauler_id: string
          id: string
          page_type: string | null
          recommended_blocks: string[] | null
          summary_embedding: string | null
          target_keywords: string[] | null
        }
        Insert: {
          competitor_ids?: string[] | null
          content_gap_summary?: string | null
          created_at?: string | null
          hauler_id: string
          id?: string
          page_type?: string | null
          recommended_blocks?: string[] | null
          summary_embedding?: string | null
          target_keywords?: string[] | null
        }
        Update: {
          competitor_ids?: string[] | null
          content_gap_summary?: string | null
          created_at?: string | null
          hauler_id?: string
          id?: string
          page_type?: string | null
          recommended_blocks?: string[] | null
          summary_embedding?: string | null
          target_keywords?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_seo_insights_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competitor_seo_insights_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
        ]
      }
      competitor_websites: {
        Row: {
          created_at: string | null
          domain: string | null
          hauler_id: string
          id: string
          is_direct_competitor: boolean | null
          last_scraped_at: string | null
          name: string | null
          source_url: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          hauler_id: string
          id?: string
          is_direct_competitor?: boolean | null
          last_scraped_at?: string | null
          name?: string | null
          source_url?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          hauler_id?: string
          id?: string
          is_direct_competitor?: boolean | null
          last_scraped_at?: string | null
          name?: string | null
          source_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_websites_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competitor_websites_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
        ]
      }
      customers: {
        Row: {
          account_type: string | null
          acct_number: string | null
          balance: number | null
          between_31_60: string | null
          between_61_90: string | null
          bil_attention: string | null
          bil_city: string | null
          bil_email: string | null
          bil_state: string | null
          bil_street: string | null
          bil_zip: string | null
          billing_email: string | null
          company_name: string | null
          created_at: string | null
          end_date: string | null
          first_name: string | null
          has_left_facebook_review: boolean | null
          has_left_google_review: boolean | null
          hauler_id: string | null
          id: string | null
          last_billed: string | null
          last_facebook_review_request: string | null
          last_google_review_request: string | null
          last_name: string | null
          last_payment: string | null
          last_pickup_date: string | null
          last_pickup_note: string | null
          last_pickup_status: string | null
          last_review_check: string | null
          last_review_request: string | null
          ml_review_suggestion: string | null
          name: string | null
          old_phy1_number: string | null
          old_phy2_number: string | null
          oldest_open_charge: string | null
          over_90: string | null
          phy_attention: string | null
          phy_city: string | null
          phy_email: string | null
          phy_state: string | null
          phy_street: string | null
          phy_zip: string | null
          phy1_description: string | null
          phy1_number: string | null
          phy2_description: string | null
          phy2_number: string | null
          route_name: string | null
          service_1: string | null
          service_1_details: string | null
          service_2: string | null
          service_2_details: string | null
          service_3: string | null
          service_3_details: string | null
          start_date: string | null
          stop_number: string | null
          suspension_end: string | null
          suspension_start: string | null
          up_to_30: string | null
          updated_at: string | null
          web_account_number: string | null
        }
        Insert: {
          account_type?: string | null
          acct_number?: string | null
          balance?: number | null
          between_31_60?: string | null
          between_61_90?: string | null
          bil_attention?: string | null
          bil_city?: string | null
          bil_email?: string | null
          bil_state?: string | null
          bil_street?: string | null
          bil_zip?: string | null
          billing_email?: string | null
          company_name?: string | null
          created_at?: string | null
          end_date?: string | null
          first_name?: string | null
          has_left_facebook_review?: boolean | null
          has_left_google_review?: boolean | null
          hauler_id?: string | null
          id?: string | null
          last_billed?: string | null
          last_facebook_review_request?: string | null
          last_google_review_request?: string | null
          last_name?: string | null
          last_payment?: string | null
          last_pickup_date?: string | null
          last_pickup_note?: string | null
          last_pickup_status?: string | null
          last_review_check?: string | null
          last_review_request?: string | null
          ml_review_suggestion?: string | null
          name?: string | null
          old_phy1_number?: string | null
          old_phy2_number?: string | null
          oldest_open_charge?: string | null
          over_90?: string | null
          phy_attention?: string | null
          phy_city?: string | null
          phy_email?: string | null
          phy_state?: string | null
          phy_street?: string | null
          phy_zip?: string | null
          phy1_description?: string | null
          phy1_number?: string | null
          phy2_description?: string | null
          phy2_number?: string | null
          route_name?: string | null
          service_1?: string | null
          service_1_details?: string | null
          service_2?: string | null
          service_2_details?: string | null
          service_3?: string | null
          service_3_details?: string | null
          start_date?: string | null
          stop_number?: string | null
          suspension_end?: string | null
          suspension_start?: string | null
          up_to_30?: string | null
          updated_at?: string | null
          web_account_number?: string | null
        }
        Update: {
          account_type?: string | null
          acct_number?: string | null
          balance?: number | null
          between_31_60?: string | null
          between_61_90?: string | null
          bil_attention?: string | null
          bil_city?: string | null
          bil_email?: string | null
          bil_state?: string | null
          bil_street?: string | null
          bil_zip?: string | null
          billing_email?: string | null
          company_name?: string | null
          created_at?: string | null
          end_date?: string | null
          first_name?: string | null
          has_left_facebook_review?: boolean | null
          has_left_google_review?: boolean | null
          hauler_id?: string | null
          id?: string | null
          last_billed?: string | null
          last_facebook_review_request?: string | null
          last_google_review_request?: string | null
          last_name?: string | null
          last_payment?: string | null
          last_pickup_date?: string | null
          last_pickup_note?: string | null
          last_pickup_status?: string | null
          last_review_check?: string | null
          last_review_request?: string | null
          ml_review_suggestion?: string | null
          name?: string | null
          old_phy1_number?: string | null
          old_phy2_number?: string | null
          oldest_open_charge?: string | null
          over_90?: string | null
          phy_attention?: string | null
          phy_city?: string | null
          phy_email?: string | null
          phy_state?: string | null
          phy_street?: string | null
          phy_zip?: string | null
          phy1_description?: string | null
          phy1_number?: string | null
          phy2_description?: string | null
          phy2_number?: string | null
          route_name?: string | null
          service_1?: string | null
          service_1_details?: string | null
          service_2?: string | null
          service_2_details?: string | null
          service_3?: string | null
          service_3_details?: string | null
          start_date?: string | null
          stop_number?: string | null
          suspension_end?: string | null
          suspension_start?: string | null
          up_to_30?: string | null
          updated_at?: string | null
          web_account_number?: string | null
        }
        Relationships: []
      }
      document_embeddings: {
        Row: {
          content: string
          content_type: string
          created_at: string
          embedding: string | null
          file_path: string | null
          id: string
          metadata: Json | null
          source_url: string | null
          title: string | null
          updated_at: string
          word_count: number | null
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          embedding?: string | null
          file_path?: string | null
          id?: string
          metadata?: Json | null
          source_url?: string | null
          title?: string | null
          updated_at?: string
          word_count?: number | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          embedding?: string | null
          file_path?: string | null
          id?: string
          metadata?: Json | null
          source_url?: string | null
          title?: string | null
          updated_at?: string
          word_count?: number | null
        }
        Relationships: []
      }
      email_attempts: {
        Row: {
          action: string | null
          attempt_number: number
          attempted_at: string
          completed_at: string | null
          edge_function_response: Json | null
          error_message: string | null
          http_status_code: number | null
          id: string
          quote_id: string | null
          status: string
        }
        Insert: {
          action?: string | null
          attempt_number?: number
          attempted_at?: string
          completed_at?: string | null
          edge_function_response?: Json | null
          error_message?: string | null
          http_status_code?: number | null
          id?: string
          quote_id?: string | null
          status?: string
        }
        Update: {
          action?: string | null
          attempt_number?: number
          attempted_at?: string
          completed_at?: string | null
          edge_function_response?: Json | null
          error_message?: string | null
          http_status_code?: number | null
          id?: string
          quote_id?: string | null
          status?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          embedding: string | null
          id: string
          is_active: boolean | null
          question: string
          sort_order: number | null
          updated_at: string
          view_count: number | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          is_active?: boolean | null
          question: string
          sort_order?: number | null
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          is_active?: boolean | null
          question?: string
          sort_order?: number | null
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      geography_columns: {
        Row: {
          coord_dimension: string | null
          f_geography_column: string | null
          f_table_catalog: string | null
          f_table_name: string | null
          f_table_schema: string | null
          srid: string | null
          type: string | null
        }
        Insert: {
          coord_dimension?: string | null
          f_geography_column?: string | null
          f_table_catalog?: string | null
          f_table_name?: string | null
          f_table_schema?: string | null
          srid?: string | null
          type?: string | null
        }
        Update: {
          coord_dimension?: string | null
          f_geography_column?: string | null
          f_table_catalog?: string | null
          f_table_name?: string | null
          f_table_schema?: string | null
          srid?: string | null
          type?: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: string | null
          f_geometry_column: string | null
          f_table_catalog: string | null
          f_table_name: string | null
          f_table_schema: string | null
          srid: string | null
          type: string | null
        }
        Insert: {
          coord_dimension?: string | null
          f_geometry_column?: string | null
          f_table_catalog?: string | null
          f_table_name?: string | null
          f_table_schema?: string | null
          srid?: string | null
          type?: string | null
        }
        Update: {
          coord_dimension?: string | null
          f_geometry_column?: string | null
          f_table_catalog?: string | null
          f_table_name?: string | null
          f_table_schema?: string | null
          srid?: string | null
          type?: string | null
        }
        Relationships: []
      }
      hauler_company: {
        Row: {
          company_name: string
          created_at: string | null
          id: string
          legal_name: string | null
          phone1: string | null
          phone2: string | null
          plasmic_id: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: string
          legal_name?: string | null
          phone1?: string | null
          phone2?: string | null
          plasmic_id?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: string
          legal_name?: string | null
          phone1?: string | null
          phone2?: string | null
          plasmic_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      hauler_locations: {
        Row: {
          city: string | null
          combo_id: number | null
          hauler_id: string
          id: string
          label: string | null
          latitude: number | null
          longitude: number | null
          population: number | null
          state: string | null
          street: string | null
          zip: string | null
        }
        Insert: {
          city?: string | null
          combo_id?: number | null
          hauler_id: string
          id?: string
          label?: string | null
          latitude?: number | null
          longitude?: number | null
          population?: number | null
          state?: string | null
          street?: string | null
          zip?: string | null
        }
        Update: {
          city?: string | null
          combo_id?: number | null
          hauler_id?: string
          id?: string
          label?: string | null
          latitude?: number | null
          longitude?: number | null
          population?: number | null
          state?: string | null
          street?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hauler_locations_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hauler_locations_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
        ]
      }
      hauler_services: {
        Row: {
          hauler_id: string
          notes: string | null
          service: string
        }
        Insert: {
          hauler_id: string
          notes?: string | null
          service: string
        }
        Update: {
          hauler_id?: string
          notes?: string | null
          service?: string
        }
        Relationships: [
          {
            foreignKeyName: "hauler_services_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hauler_services_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
          {
            foreignKeyName: "hauler_services_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["service"]
          },
        ]
      }
      hoa_quote_requests: {
        Row: {
          contact_name: string
          email: string
          hoa_name: string
          id: string
          notes: string | null
          num_units: number | null
          phone: string | null
          submitted_at: string
          town: string | null
        }
        Insert: {
          contact_name: string
          email: string
          hoa_name: string
          id?: string
          notes?: string | null
          num_units?: number | null
          phone?: string | null
          submitted_at?: string
          town?: string | null
        }
        Update: {
          contact_name?: string
          email?: string
          hoa_name?: string
          id?: string
          notes?: string | null
          num_units?: number | null
          phone?: string | null
          submitted_at?: string
          town?: string | null
        }
        Relationships: []
      }
      kb_articles: {
        Row: {
          category_id: string | null
          content: string
          created_at: string
          embedding: string | null
          excerpt: string | null
          featured_image: string | null
          helpful_count: number | null
          id: string
          is_published: boolean | null
          not_helpful_count: number | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string
          embedding?: string | null
          excerpt?: string | null
          featured_image?: string | null
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          not_helpful_count?: number | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string
          embedding?: string | null
          excerpt?: string | null
          featured_image?: string | null
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          not_helpful_count?: number | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kb_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "kb_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      page_metadata: {
        Row: {
          created_at: string
          description: string | null
          id: string
          keywords: string[] | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_path: string
          schema_markup: Json | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_path: string
          schema_markup?: Json | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_path?: string
          schema_markup?: Json | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          button_text: string | null
          button_url: string | null
          created_at: string | null
          description: string | null
          display_order: number
          embedding: string | null
          id: number
          image_path: string | null
          page_slug: string
          section_name: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number
          embedding?: string | null
          id?: never
          image_path?: string | null
          page_slug: string
          section_name: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number
          embedding?: string | null
          id?: never
          image_path?: string | null
          page_slug?: string
          section_name?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          address: string | null
          created_at: string
          email: string
          email_error_message: string | null
          email_sent_at: string | null
          email_status: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          postmark_message_id: string | null
          service_type: string
          smsConsent: boolean | null
          status: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          email_error_message?: string | null
          email_sent_at?: string | null
          email_status?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          postmark_message_id?: string | null
          service_type: string
          smsConsent?: boolean | null
          status?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          email_error_message?: string | null
          email_sent_at?: string | null
          email_status?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          postmark_message_id?: string | null
          service_type?: string
          smsConsent?: boolean | null
          status?: string
        }
        Relationships: []
      }
      residential_faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          embedding: string | null
          id: string
          is_active: boolean
          question: string
          sort_order: number | null
          town_slug: string | null
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          is_active?: boolean
          question: string
          sort_order?: number | null
          town_slug?: string | null
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          is_active?: boolean
          question?: string
          sort_order?: number | null
          town_slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_residential_faqs_town_slug"
            columns: ["town_slug"]
            isOneToOne: false
            referencedRelation: "residential_towns"
            referencedColumns: ["slug"]
          },
        ]
      }
      residential_towns: {
        Row: {
          created_at: string
          embedding: string | null
          hero_alt_text: string | null
          hero_image_url: string | null
          hero_subheading: string | null
          id: string
          is_active: boolean
          local_blurb: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          pricing_info: string | null
          service_availability: string[] | null
          slug: string
          state: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          hero_alt_text?: string | null
          hero_image_url?: string | null
          hero_subheading?: string | null
          id?: string
          is_active?: boolean
          local_blurb?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          pricing_info?: string | null
          service_availability?: string[] | null
          slug: string
          state?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          embedding?: string | null
          hero_alt_text?: string | null
          hero_image_url?: string | null
          hero_subheading?: string | null
          id?: string
          is_active?: boolean
          local_blurb?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          pricing_info?: string | null
          service_availability?: string[] | null
          slug?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      rolloff_faq_embeddings: {
        Row: {
          content_text: string | null
          created_at: string
          embedding: string | null
          faq_id: string | null
          id: string
        }
        Insert: {
          content_text?: string | null
          created_at?: string
          embedding?: string | null
          faq_id?: string | null
          id?: string
        }
        Update: {
          content_text?: string | null
          created_at?: string
          embedding?: string | null
          faq_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rolloff_faq_embeddings_faq_id_fkey"
            columns: ["faq_id"]
            isOneToOne: false
            referencedRelation: "rolloff_faqs"
            referencedColumns: ["id"]
          },
        ]
      }
      rolloff_faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          is_active: boolean | null
          question: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          question: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          question?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      rolloff_page_embeddings: {
        Row: {
          chunk_type: string
          content_chunk: string
          created_at: string
          embedding: string | null
          id: string
          metadata: Json | null
          town_slug: string
        }
        Insert: {
          chunk_type: string
          content_chunk: string
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          town_slug: string
        }
        Update: {
          chunk_type?: string
          content_chunk?: string
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          town_slug?: string
        }
        Relationships: []
      }
      rolloff_quote_requests: {
        Row: {
          best_contact_time: string | null
          business_name: string | null
          created_at: string
          dumpster_sizes: string[] | null
          email: string
          full_name: string
          id: string
          location: string
          material_types: string | null
          notes: string | null
          phone: string
          project_duration: string | null
          status: string | null
          town_slug: string | null
        }
        Insert: {
          best_contact_time?: string | null
          business_name?: string | null
          created_at?: string
          dumpster_sizes?: string[] | null
          email: string
          full_name: string
          id?: string
          location: string
          material_types?: string | null
          notes?: string | null
          phone: string
          project_duration?: string | null
          status?: string | null
          town_slug?: string | null
        }
        Update: {
          best_contact_time?: string | null
          business_name?: string | null
          created_at?: string
          dumpster_sizes?: string[] | null
          email?: string
          full_name?: string
          id?: string
          location?: string
          material_types?: string | null
          notes?: string | null
          phone?: string
          project_duration?: string | null
          status?: string | null
          town_slug?: string | null
        }
        Relationships: []
      }
      rolloff_size_faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          is_active: boolean | null
          question: string
          rolloff_size_id: number
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          question: string
          rolloff_size_id: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          question?: string
          rolloff_size_id?: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rolloff_size_faqs_rolloff_size_id_fkey"
            columns: ["rolloff_size_id"]
            isOneToOne: false
            referencedRelation: "rolloff_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      rolloff_sizes: {
        Row: {
          created_at: string | null
          cubic_yards: number
          description: string | null
          detailed_description: string | null
          dimensions: string | null
          display_order: number
          embedding: string | null
          hero_image_url: string | null
          id: number
          ideal_for: string | null
          meta_description: string | null
          meta_title: string | null
          pricing_range: string | null
          seo_keywords: string[] | null
          size_label: string
          slug: string | null
          specifications: Json | null
          updated_at: string | null
          use_cases: string[] | null
          weight_limit: string | null
        }
        Insert: {
          created_at?: string | null
          cubic_yards: number
          description?: string | null
          detailed_description?: string | null
          dimensions?: string | null
          display_order?: number
          embedding?: string | null
          hero_image_url?: string | null
          id?: never
          ideal_for?: string | null
          meta_description?: string | null
          meta_title?: string | null
          pricing_range?: string | null
          seo_keywords?: string[] | null
          size_label: string
          slug?: string | null
          specifications?: Json | null
          updated_at?: string | null
          use_cases?: string[] | null
          weight_limit?: string | null
        }
        Update: {
          created_at?: string | null
          cubic_yards?: number
          description?: string | null
          detailed_description?: string | null
          dimensions?: string | null
          display_order?: number
          embedding?: string | null
          hero_image_url?: string | null
          id?: never
          ideal_for?: string | null
          meta_description?: string | null
          meta_title?: string | null
          pricing_range?: string | null
          seo_keywords?: string[] | null
          size_label?: string
          slug?: string | null
          specifications?: Json | null
          updated_at?: string | null
          use_cases?: string[] | null
          weight_limit?: string | null
        }
        Relationships: []
      }
      rolloff_towns: {
        Row: {
          created_at: string
          embedding: string | null
          hero_alt_text: string | null
          hero_image_url: string | null
          id: string
          is_active: boolean | null
          kml_polygon_data: string | null
          local_blurb: string | null
          map_center_lat: number | null
          map_center_lng: number | null
          meta_description: string | null
          meta_title: string | null
          name: string
          slug: string
          state: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          hero_alt_text?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean | null
          kml_polygon_data?: string | null
          local_blurb?: string | null
          map_center_lat?: number | null
          map_center_lng?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          slug: string
          state?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          embedding?: string | null
          hero_alt_text?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean | null
          kml_polygon_data?: string | null
          local_blurb?: string | null
          map_center_lat?: number | null
          map_center_lng?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          slug?: string
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_area_polygons: {
        Row: {
          created_at: string | null
          id: string
          label: string
          polygon: Json
          service_day: string
          town_slug: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          polygon: Json
          service_day: string
          town_slug?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          polygon?: Json
          service_day?: string
          town_slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_page_requirements: {
        Row: {
          page_type: string
          priority: number | null
          service: string
        }
        Insert: {
          page_type: string
          priority?: number | null
          service: string
        }
        Update: {
          page_type?: string
          priority?: number | null
          service?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_page_requirements_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["service"]
          },
        ]
      }
      service_types: {
        Row: {
          display_name: string
          service: string
        }
        Insert: {
          display_name: string
          service: string
        }
        Update: {
          display_name?: string
          service?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          embedding: string | null
          featured_image: string | null
          gallery_images: string[] | null
          id: string
          is_active: boolean | null
          pricing_info: Json | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          service_areas: string[] | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean | null
          pricing_info?: Json | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          service_areas?: string[] | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          featured_image?: string | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean | null
          pricing_info?: Json | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          service_areas?: string[] | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      size_calculator_results: {
        Row: {
          id: string
          pickup_frequency: string
          project_type: string
          result_size: string
          submitted_at: string
          town_slug: string | null
          user_ip: string | null
          user_uuid: string | null
          volume_level: string
        }
        Insert: {
          id?: string
          pickup_frequency: string
          project_type: string
          result_size: string
          submitted_at?: string
          town_slug?: string | null
          user_ip?: string | null
          user_uuid?: string | null
          volume_level: string
        }
        Update: {
          id?: string
          pickup_frequency?: string
          project_type?: string
          result_size?: string
          submitted_at?: string
          town_slug?: string | null
          user_ip?: string | null
          user_uuid?: string | null
          volume_level?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          description: string
          id: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string | null
          content: string
          created_at: string
          customer_name: string
          customer_title: string | null
          embedding: string | null
          id: string
          image_url: string | null
          is_approved: boolean | null
          is_featured: boolean | null
          location: string | null
          rating: number | null
          service_type: string | null
        }
        Insert: {
          company?: string | null
          content: string
          created_at?: string
          customer_name: string
          customer_title?: string | null
          embedding?: string | null
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          rating?: number | null
          service_type?: string | null
        }
        Update: {
          company?: string | null
          content?: string
          created_at?: string
          customer_name?: string
          customer_title?: string | null
          embedding?: string | null
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          rating?: number | null
          service_type?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vectorization_jobs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          source_path: string
          source_type: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          source_path: string
          source_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          source_path?: string
          source_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      vectorization_test: {
        Row: {
          content: string
          created_at: string
          embedding: string | null
          id: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      website_images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          file_size: number | null
          height: number | null
          id: string
          image_name: string
          image_path: string
          image_url: string | null
          is_placeholder: boolean | null
          page_name: string
          updated_at: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_size?: number | null
          height?: number | null
          id?: string
          image_name: string
          image_path: string
          image_url?: string | null
          is_placeholder?: boolean | null
          page_name: string
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_size?: number | null
          height?: number | null
          id?: string
          image_name?: string
          image_path?: string
          image_url?: string | null
          is_placeholder?: boolean | null
          page_name?: string
          updated_at?: string | null
          width?: number | null
        }
        Relationships: []
      }
      website_punchlist: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          embedding: string | null
          hauler_id: string
          id: string
          page_url: string | null
          priority: number | null
          profile_json: Json | null
          profile_text: string | null
          source: string | null
          state: string | null
          status: string | null
          town: string | null
          updated_at: string | null
          website_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          embedding?: string | null
          hauler_id: string
          id?: string
          page_url?: string | null
          priority?: number | null
          profile_json?: Json | null
          profile_text?: string | null
          source?: string | null
          state?: string | null
          status?: string | null
          town?: string | null
          updated_at?: string | null
          website_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          embedding?: string | null
          hauler_id?: string
          id?: string
          page_url?: string | null
          priority?: number | null
          profile_json?: Json | null
          profile_text?: string | null
          source?: string | null
          state?: string | null
          status?: string | null
          town?: string | null
          updated_at?: string | null
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_punchlist_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_punchlist_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
          {
            foreignKeyName: "website_punchlist_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "competitor_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      website_punchlist_steps: {
        Row: {
          is_done: boolean | null
          punchlist_id: string
          step_no: number
          step_text: string | null
        }
        Insert: {
          is_done?: boolean | null
          punchlist_id: string
          step_no: number
          step_text?: string | null
        }
        Update: {
          is_done?: boolean | null
          punchlist_id?: string
          step_no?: number
          step_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "website_punchlist_steps_punchlist_id_fkey"
            columns: ["punchlist_id"]
            isOneToOne: false
            referencedRelation: "website_punchlist"
            referencedColumns: ["id"]
          },
        ]
      }
      websites: {
        Row: {
          created_at: string | null
          domain: string | null
          hauler_id: string | null
          id: string
          site_type: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          hauler_id?: string | null
          id: string
          site_type?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          hauler_id?: string | null
          id?: string
          site_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "websites_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "websites_hauler_id_fkey"
            columns: ["hauler_id"]
            isOneToOne: false
            referencedRelation: "hauler_required_pages"
            referencedColumns: ["hauler_id"]
          },
        ]
      }
    }
    Views: {
      hauler_required_pages: {
        Row: {
          company_name: string | null
          hauler_id: string | null
          page_type: string | null
          priority: number | null
          service: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_page_requirements_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["service"]
          },
        ]
      }
      pending_image_uploads: {
        Row: {
          alt_text: string | null
          image_name: string | null
          image_path: string | null
          page_name: string | null
        }
        Insert: {
          alt_text?: string | null
          image_name?: string | null
          image_path?: string | null
          page_name?: string | null
        }
        Update: {
          alt_text?: string | null
          image_name?: string | null
          image_path?: string | null
          page_name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      batch_vectorize_page_sections: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_internal_user: {
        Args: { _user_id: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      retry_failed_emails: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      search_similar_documents: {
        Args: {
          content_type_filter?: string
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          content_type: string
          id: string
          metadata: Json
          similarity: number
          source_url: string
          title: string
        }[]
      }
      send_quote_email_manual: {
        Args: { quote_uuid: string }
        Returns: Json
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      test_http_connectivity: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      app_role: "super_admin" | "dumpster_diverz_team" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "dumpster_diverz_team", "user"],
    },
  },
} as const
