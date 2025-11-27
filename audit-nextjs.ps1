# Next.js Compatibility Audit Script for Dumpster Diverz
Write-Host '🔍 AUDITING DUMPSTER DIVERZ FOR NEXT.JS COMPATIBILITY...' -ForegroundColor Cyan
Write-Host ''

$issues = @()

# Check 1: Find all react-router-dom imports
Write-Host '[1/8] Checking for react-router-dom imports...' -ForegroundColor Yellow
$routerFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'react-router-dom'
}
if ($routerFiles.Count -gt 0) {
    $issues += '❌ Found ' + $routerFiles.Count + ' files using react-router-dom'
    Write-Host ('   Found in: ' + $routerFiles.Count + ' files') -ForegroundColor Red
    $routerFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ No react-router-dom imports found' -ForegroundColor Green
}

# Check 2: Find import.meta.env usage
Write-Host '[2/8] Checking for import.meta.env usage...' -ForegroundColor Yellow
$envFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'import\.meta\.env'
}
if ($envFiles.Count -gt 0) {
    $issues += '❌ Found ' + $envFiles.Count + ' files using import.meta.env'
    Write-Host ('   Found in: ' + $envFiles.Count + ' files') -ForegroundColor Red
    $envFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ No import.meta.env usage found' -ForegroundColor Green
}

# Check 3: Find Link components using 'to' instead of 'href'
Write-Host '[3/8] Checking Link components for to prop...' -ForegroundColor Yellow
$linkFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    $content -match '<Link[^>]*\sto='
}
if ($linkFiles.Count -gt 0) {
    $issues += '❌ Found ' + $linkFiles.Count + ' files with Link using to prop'
    Write-Host ('   Found in: ' + $linkFiles.Count + ' files') -ForegroundColor Red
    $linkFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ All Link components compatible' -ForegroundColor Green
}

# Check 4: Check for react-helmet-async
Write-Host '[4/8] Checking for react-helmet-async...' -ForegroundColor Yellow
$helmetFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'react-helmet-async'
}
if ($helmetFiles.Count -gt 0) {
    $issues += '⚠️ Found ' + $helmetFiles.Count + ' files using react-helmet-async'
    Write-Host ('   Found in: ' + $helmetFiles.Count + ' files') -ForegroundColor Yellow
    $helmetFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ No react-helmet-async usage' -ForegroundColor Green
}

# Check 5: Check for useNavigate hook
Write-Host '[5/8] Checking for useNavigate hook...' -ForegroundColor Yellow
$navigateFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'useNavigate'
}
if ($navigateFiles.Count -gt 0) {
    $issues += '❌ Found ' + $navigateFiles.Count + ' files using useNavigate'
    Write-Host ('   Found in: ' + $navigateFiles.Count + ' files') -ForegroundColor Red
    $navigateFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ No useNavigate usage' -ForegroundColor Green
}

# Check 6: Check for useLocation hook
Write-Host '[6/8] Checking for useLocation hook...' -ForegroundColor Yellow
$locationFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'useLocation'
}
if ($locationFiles.Count -gt 0) {
    $issues += '❌ Found ' + $locationFiles.Count + ' files using useLocation'
    Write-Host ('   Found in: ' + $locationFiles.Count + ' files') -ForegroundColor Red
    $locationFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ No useLocation usage' -ForegroundColor Green
}

# Check 7: Check for useParams hook
Write-Host '[7/8] Checking for useParams hook...' -ForegroundColor Yellow
$paramsFiles = Get-ChildItem -Path 'src' -Filter '*.tsx' -Recurse -ErrorAction SilentlyContinue | Where-Object {
    (Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue) -match 'useParams'
}
if ($paramsFiles.Count -gt 0) {
    $issues += '⚠️ Found ' + $paramsFiles.Count + ' files using useParams'
    Write-Host ('   Found in: ' + $paramsFiles.Count + ' files') -ForegroundColor Yellow
    $paramsFiles | ForEach-Object { Write-Host ('      - ' + $_.Name) -ForegroundColor Gray }
} else {
    Write-Host '   ✅ No useParams usage' -ForegroundColor Green
}

# Check 8: Check package.json
Write-Host '[8/8] Checking package.json...' -ForegroundColor Yellow
if (Test-Path 'package.json') {
    $packageContent = Get-Content 'package.json' -Raw
    if ($packageContent -match 'vite') {
        $issues += '⚠️ Project uses Vite (needs conversion to Next.js)'
        Write-Host '   ⚠️ Uses Vite - needs Next.js conversion' -ForegroundColor Yellow
    }
    if ($packageContent -match 'next') {
        Write-Host '   ✅ Next.js is in dependencies' -ForegroundColor Green
    } else {
        $issues += '❌ Next.js not in package.json'
        Write-Host '   ❌ Next.js not in package.json' -ForegroundColor Red
    }
}

# Summary
Write-Host ''
Write-Host ('=' * 70) -ForegroundColor Gray
Write-Host ('📋 FOUND ' + $issues.Count + ' ISSUES TO ADDRESS:') -ForegroundColor Cyan
Write-Host ''
foreach ($issue in $issues) {
    Write-Host ('   ' + $issue) -ForegroundColor Yellow
}
Write-Host ('=' * 70) -ForegroundColor Gray
