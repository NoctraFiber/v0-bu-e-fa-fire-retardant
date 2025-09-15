#!/bin/bash

# Script zum sicheren Rückgängigmachen des JSON Navigation Merges
# Verwendung: ./scripts/undo-merge.sh [--dry-run]

set -e

MERGE_COMMIT="a2a21ea"
BACKUP_BRANCH="backup-before-revert-$(date +%Y%m%d-%H%M%S)"

echo "🔄 Merge Revert Script für JSON Navigation"
echo "=========================================="
echo ""
echo "Merge Commit: $MERGE_COMMIT"
echo "Backup Branch: $BACKUP_BRANCH"
echo ""

# Überprüfe ob wir im richtigen Repository sind
if [ ! -f "package.json" ] || [ ! -d ".git" ]; then
    echo "❌ Fehler: Bitte führe das Script im Repository-Root-Verzeichnis aus"
    exit 1
fi

# Überprüfe ob der Merge Commit existiert
if ! git rev-parse --verify "$MERGE_COMMIT" >/dev/null 2>&1; then
    echo "❌ Fehler: Merge Commit $MERGE_COMMIT nicht gefunden"
    exit 1
fi

# Dry Run Modus
if [ "$1" = "--dry-run" ]; then
    echo "🧪 DRY RUN MODUS - Keine Änderungen werden vorgenommen"
    echo ""
    echo "Folgende Aktionen würden durchgeführt:"
    echo "1. Backup Branch erstellen: $BACKUP_BRANCH"
    echo "2. Merge Commit revertieren: $MERGE_COMMIT"
    echo "3. Build testen"
    echo "4. Bei Erfolg: Commit erstellen"
    echo ""
    echo "Um den Revert tatsächlich durchzuführen, führe aus:"
    echo "./scripts/undo-merge.sh"
    exit 0
fi

# Bestätigung einholen
echo "⚠️  WARNUNG: Dieser Vorgang wird den Merge rückgängig machen!"
echo ""
echo "Betroffener Merge:"
git show --stat "$MERGE_COMMIT" | head -10
echo ""
read -p "Möchtest du fortfahren? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Abgebrochen"
    exit 1
fi

echo ""
echo "🚀 Starte Revert-Prozess..."

# 1. Backup Branch erstellen
echo "📁 Erstelle Backup Branch: $BACKUP_BRANCH"
git branch "$BACKUP_BRANCH"
echo "✅ Backup erstellt"

# 2. Stelle sicher, dass wir auf main sind
echo "🔀 Wechsle zu main Branch"
git checkout main
git pull origin main
echo "✅ Auf aktuellem main Branch"

# 3. Revert durchführen (aber noch nicht committen)
echo "⏪ Revertiere Merge Commit..."
if git revert --no-commit -m 1 "$MERGE_COMMIT"; then
    echo "✅ Revert erfolgreich vorbereitet"
else
    echo "❌ Fehler beim Revert. Mögliche Merge-Konflikte?"
    echo "Backup Branch verfügbar: $BACKUP_BRANCH"
    exit 1
fi

# 4. Build testen
echo "🔨 Teste Build nach Revert..."
if command -v npm >/dev/null 2>&1; then
    if npm run build >/dev/null 2>&1; then
        echo "✅ Build erfolgreich"
    else
        echo "❌ Build fehlgeschlagen nach Revert"
        echo "Führe manuell 'npm run build' aus um Details zu sehen"
        echo "Backup Branch verfügbar: $BACKUP_BRANCH"
        echo ""
        echo "Um den Revert rückgängig zu machen:"
        echo "git reset --hard HEAD"
        exit 1
    fi
else
    echo "⚠️  npm nicht gefunden - überspringe Build-Test"
fi

# 5. Commit erstellen
echo "💾 Erstelle Revert Commit..."
git commit -m "Revert: Undo JSON navigation merge (PR #12)

This reverts commit $MERGE_COMMIT.

- Removes JSON-based main navigation
- Removes responsive navigation components  
- Removes accessibility features from navigation merge
- Restores previous navigation state

Backup branch created: $BACKUP_BRANCH"

echo "✅ Revert Commit erstellt"

# 6. Zusammenfassung
echo ""
echo "🎉 Merge erfolgreich rückgängig gemacht!"
echo ""
echo "Nächste Schritte:"
echo "1. Überprüfe die Änderungen: git show HEAD"
echo "2. Teste die Anwendung: npm run dev"
echo "3. Falls alles OK: git push origin main"
echo "4. Falls Probleme: git reset --hard $BACKUP_BRANCH"
echo ""
echo "Backup Branch: $BACKUP_BRANCH"
echo "Merge Commit revertiert: $MERGE_COMMIT"