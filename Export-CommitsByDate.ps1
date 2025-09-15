<#
Export-CommitsByDate.ps1
#>

param(
    [string]$OutputDir = ".\commits_by_date",
    [int]$MaxCommits = 0   # 0 = all commits
)

# 1. Check git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "git not found. Install Git for Windows and ensure 'git' is on PATH."
    exit 1
}

# 2. Ensure repo root
if (-not (Test-Path ".git")) {
    Write-Error "This does not look like a git repo root ('.git' folder not found). cd to repo root and re-run."
    exit 1
}

# 3. Create output dir
New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

# 4. Get commits (hash|date)
$fmtArg = '--pretty=format:%H|%ad'
if ($MaxCommits -gt 0) {
    $commits = & git log -n $MaxCommits $fmtArg '--date=short'
} else {
    $commits = & git log $fmtArg '--date=short'
}

# 5. Loop and export each commit
foreach ($line in $commits) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line -split '\|',2
    $hash = $parts[0].Trim()
    $date = $parts[1].Trim()

    $dateDir = Join-Path $OutputDir $date
    New-Item -ItemType Directory -Path $dateDir -Force | Out-Null

    # Commit subject
    $subject = & git log -n 1 --pretty=format:%s $hash

    # Sanitize folder name
    $invalid = [System.IO.Path]::GetInvalidFileNameChars() -join ''
    $regex = "[{0}]" -f [Regex]::Escape($invalid)
    $folderName = ($subject -replace $regex, "_")

    $shortHash = $hash.Substring(0,7)
    $folderName = "$folderName [$shortHash]"

    $commitDir = Join-Path $dateDir $folderName

    Write-Host "Exporting $hash ($date) -> $commitDir"

    # temp zip
    $zipPath = Join-Path $env:TEMP "$shortHash.zip"

    # create archive
    & git archive --format=zip -o $zipPath $hash
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "git archive failed for $hash"
        continue
    }

    # extract zip
    Expand-Archive -Path $zipPath -DestinationPath $commitDir -Force

    # cleanup
    Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
}

Write-Host "Export finished. Output folder: $OutputDir"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to run git log. Are you in a valid git repo?"
    exit 1
}