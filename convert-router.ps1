# Next.js Router Conversion Script
Write-Host "🔄 Converting react-router-dom to Next.js..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match "react-router-dom"
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Replace import statements
    # Link import: react-router-dom -> next/link
    $content = $content -replace "import \{ Link \} from 'react-router-dom';", "import Link from 'next/link';"
    $content = $content -replace 'import \{ Link \} from "react-router-dom";', "import Link from 'next/link';"
    
    # Link with other imports - need to extract Link and keep others
    $content = $content -replace "import \{ Link, ([^}]+) \} from 'react-router-dom';", "import Link from 'next/link';`nimport { `$1 } from 'next/navigation';"
    $content = $content -replace 'import \{ Link, ([^}]+) \} from "react-router-dom";', "import Link from 'next/link';`nimport { `$1 } from 'next/navigation';"
    
    # Replace remaining react-router-dom imports with next/navigation
    $content = $content -replace "from 'react-router-dom'", "from 'next/navigation'"
    $content = $content -replace 'from "react-router-dom"', "from 'next/navigation'"
    
    # Replace useNavigate with useRouter
    $content = $content -replace "useNavigate\(\)", "useRouter()"
    $content = $content -replace "const navigate = useRouter\(\)", "const router = useRouter()"
    $content = $content -replace "navigate\(", "router.push("
    
    # Replace useLocation with usePathname
    $content = $content -replace "useLocation\(\)", "usePathname()"
    $content = $content -replace "const location = usePathname\(\)", "const pathname = usePathname()"
    $content = $content -replace "location\.pathname", "pathname"
    
    # Replace Link to= with href=
    $content = $content -replace "<Link to=", "<Link href="
    $content = $content -replace "<Link\s+to=", "<Link href="
    
    # Replace useSearchParams import (it exists in next/navigation too, but returns differently)
    # We'll handle this case-by-case
    
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  ✅ Converted: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Router conversion complete!" -ForegroundColor Green
