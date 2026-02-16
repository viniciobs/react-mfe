param (
    [string]$BuildReason,
    [string]$SourcesDirectory
)

$configPath = Join-Path $SourcesDirectory "react-mfe/.azure\mfe.config.json"

if (!(Test-Path $configPath)) {
    Write-Error "mfe.config.json not found at $configPath"
    exit 1
}

$mfeMap = Get-Content $configPath | ConvertFrom-Json

if ($BuildReason -eq "PullRequest") {
    $changedFiles = git diff --name-only origin/main...HEAD
}
else {
    $changedFiles = git diff --name-only HEAD~1 HEAD
}

Write-Host "Changed files:"
$changedFiles | ForEach-Object { Write-Host $_ }

$matrix = @{}

foreach ($mfe in $mfeMap.PSObject.Properties) {
    $mfeName = $mfe.Name
    $path = $mfe.Value.TrimEnd("/")

    # Escape for regex
    $escapedPath = [regex]::Escape($path)

    if ($changedFiles | Where-Object { $_ -match "^$escapedPath/" }) {
        Write-Host "Detected changes in $mfeName"

        $matrix[$mfeName] = @{
            mfeName    = $mfeName
            mfePath    = $path
            deployPath = $path
        }
    }
}

if ($matrix.Count -eq 0) {
    Write-Host "No changes detected in any MFE. Exiting pipeline."
    exit 0
}

$json = $matrix | ConvertTo-Json -Depth 10 -Compress
Write-Host "Matrix JSON: $json"
Write-Host "##vso[task.setvariable variable=mfeMatrix;isOutput=true]$json"
