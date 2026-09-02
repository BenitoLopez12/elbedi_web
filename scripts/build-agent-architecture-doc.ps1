param(
  [string]$Source = "docs/arquitectura-agente-ia-elbedi.md",
  [string]$Output = "docs/Arquitectura-tecnica-agente-IA-ELBEDI.docx"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Escape-Xml([string]$Text) {
  return [System.Security.SecurityElement]::Escape($Text)
}

function Run-Xml([string]$Text, [string]$Style = "", [switch]$Bold, [switch]$Italic, [string]$Color = "") {
  $rPr = ""
  if ($Style -eq "code") {
    $rPr += '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/><w:szCs w:val="18"/>'
  }
  if ($Bold) { $rPr += "<w:b/>" }
  if ($Italic) { $rPr += "<w:i/>" }
  if ($Color) { $rPr += "<w:color w:val=`"$Color`"/>" }
  return "<w:r><w:rPr>$rPr</w:rPr><w:t xml:space=`"preserve`">$(Escape-Xml $Text)</w:t></w:r>"
}

function Paragraph-Xml([string]$Text, [string]$Style = "Normal", [int]$NumId = 0, [int]$Level = 0) {
  $num = if ($NumId -gt 0) { "<w:numPr><w:ilvl w:val=`"$Level`"/><w:numId w:val=`"$NumId`"/></w:numPr>" } else { "" }
  $runs = ""
  $parts = [regex]::Split($Text, '(`[^`]+`|\*\*[^*]+\*\*)')
  foreach ($part in $parts) {
    if (-not $part) { continue }
    if ($part.StartsWith([string][char]96) -and $part.EndsWith([string][char]96)) {
      $runs += Run-Xml $part.Substring(1, $part.Length - 2) -Style "code"
    } elseif ($part.StartsWith("**") -and $part.EndsWith("**")) {
      $runs += Run-Xml $part.Substring(2, $part.Length - 4) -Bold
    } else {
      $runs += Run-Xml $part
    }
  }
  return "<w:p><w:pPr><w:pStyle w:val=`"$Style`"/>$num</w:pPr>$runs</w:p>"
}

$sourcePath = (Resolve-Path $Source).Path
$outputPath = Join-Path (Resolve-Path (Split-Path $Output -Parent)).Path (Split-Path $Output -Leaf)
$work = Join-Path $env:TEMP ("elbedi-docx-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path "$work\_rels", "$work\word\_rels", "$work\word\theme", "$work\docProps" -Force | Out-Null

$body = New-Object System.Text.StringBuilder
$inCode = $false
$codeLines = New-Object System.Collections.Generic.List[string]

foreach ($rawLine in Get-Content -Encoding UTF8 $sourcePath) {
  $line = $rawLine.TrimEnd()
  if ($line.StartsWith('```')) {
    if ($inCode) {
      $codeText = ($codeLines -join "`n")
      [void]$body.Append("<w:p><w:pPr><w:pStyle w:val=`"CodeBlock`"/></w:pPr>$(Run-Xml $codeText -Style code)</w:p>")
      $codeLines.Clear()
      $inCode = $false
    } else {
      $inCode = $true
    }
    continue
  }
  if ($inCode) {
    $codeLines.Add($line)
    continue
  }
  if ($line -eq "---") {
    [void]$body.Append('<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="8" w:color="9B73D4"/></w:pBdr><w:spacing w:before="80" w:after="160"/></w:pPr></w:p>')
  } elseif ($line -match '^# (.+)$') {
    [void]$body.Append((Paragraph-Xml $Matches[1] "Title"))
  } elseif ($line -match '^## (.+)$') {
    [void]$body.Append((Paragraph-Xml $Matches[1] "Heading1"))
  } elseif ($line -match '^### (.+)$') {
    [void]$body.Append((Paragraph-Xml $Matches[1] "Heading2"))
  } elseif ($line -match '^\d+\. (.+)$') {
    [void]$body.Append((Paragraph-Xml $Matches[1] "Normal" 2 0))
  } elseif ($line -match '^- \[ \] (.+)$') {
    [void]$body.Append((Paragraph-Xml ("☐ " + $Matches[1]) "Normal"))
  } elseif ($line -match '^- (.+)$') {
    [void]$body.Append((Paragraph-Xml $Matches[1] "Normal" 1 0))
  } elseif ([string]::IsNullOrWhiteSpace($line)) {
    [void]$body.Append('<w:p><w:pPr><w:spacing w:after="40"/></w:pPr></w:p>')
  } else {
    [void]$body.Append((Paragraph-Xml $line "Normal"))
  }
}

$documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    $($body.ToString())
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708"/>
      <w:headerReference w:type="default" r:id="rIdHeader" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>
      <w:footerReference w:type="default" r:id="rIdFooter" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>
    </w:sectPr>
  </w:body>
</w:document>
"@

$stylesXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="20243A"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="120" w:after="180"/><w:keepNext/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:color w:val="31245E"/><w:sz w:val="54"/><w:szCs w:val="54"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="360" w:after="160"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:color w:val="6D38BD"/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="240" w:after="100"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="3853F0"/><w:sz w:val="25"/><w:szCs w:val="25"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="CodeBlock"><w:name w:val="Code Block"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="80" w:after="160" w:line="250" w:lineRule="auto"/><w:ind w:left="240" w:right="240"/><w:shd w:val="clear" w:fill="F2EFFE"/></w:pPr><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/><w:szCs w:val="18"/><w:color w:val="30265A"/></w:rPr></w:style>
</w:styles>
'@

$numberingXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="360"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="360"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
  <w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>
'@

$relsXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
'@

$docRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rIdNumbering" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
  <Relationship Id="rIdHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>
  <Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
</Relationships>
'@

$typesXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
'@

$headerXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="D9D1F3"/></w:pBdr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="17"/><w:color w:val="766B91"/></w:rPr><w:t>ELBEDI · Arquitectura del agente IA</w:t></w:r></w:p></w:hdr>
'@

$footerXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="766B91"/></w:rPr><w:t>Página </w:t></w:r><w:fldSimple w:instr="PAGE"><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="766B91"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>
'@

$coreXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Arquitectura técnica del agente de inteligencia artificial de ELBEDI</dc:title><dc:creator>ELBEDI</dc:creator><dc:subject>Especificación técnica de replicación</dc:subject><dc:description>Auditoría técnica del chat agéntico, navegación, botones, streaming, WhatsApp y resiliencia.</dc:description><dcterms:created xsi:type="dcterms:W3CDTF">2026-07-24T00:00:00Z</dcterms:created></cp:coreProperties>
'@

$appXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>ELBEDI Documentation Builder</Application></Properties>
'@

$files = @{
  "[Content_Types].xml" = $typesXml
  "_rels\.rels" = $relsXml
  "word\document.xml" = $documentXml
  "word\styles.xml" = $stylesXml
  "word\numbering.xml" = $numberingXml
  "word\_rels\document.xml.rels" = $docRels
  "word\header1.xml" = $headerXml
  "word\footer1.xml" = $footerXml
  "docProps\core.xml" = $coreXml
  "docProps\app.xml" = $appXml
}

foreach ($entry in $files.GetEnumerator()) {
  $path = Join-Path $work $entry.Key
  [System.IO.File]::WriteAllText($path, $entry.Value, [System.Text.UTF8Encoding]::new($false))
}

if (Test-Path $outputPath) { Remove-Item -LiteralPath $outputPath -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($work, $outputPath)
Remove-Item -LiteralPath $work -Recurse -Force
Write-Output $outputPath
