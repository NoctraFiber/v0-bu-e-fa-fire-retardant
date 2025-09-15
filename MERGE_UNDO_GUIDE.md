# Anleitung zum Rückgängigmachen des Merges

## Übersicht

Sie möchten den Merge-Commit `a2a21ea` rückgängig machen, der mit Pull Request #12 die JSON-basierte Hauptnavigation hinzugefügt hat.

**Merge-Commit Details:**
- Commit: `a2a21ea2459f21c0556b63785af2031aff7f5c24`
- Titel: "Merge pull request #12 from NoctraFiber/feat/json-main-navigation"
- Beschreibung: "feat(nav): bind main navigation from JSON (responsive + accessible)"
- Änderungen: 8.727 Zeilen in 67 Dateien hinzugefügt

## Optionen zum Rückgängigmachen

### Option 1: Git Revert (Empfohlen - Sicher)

Der sicherste Weg ist die Verwendung von `git revert`, der einen neuen Commit erstellt, der die Änderungen rückgängig macht:

```bash
# Stelle sicher, dass du auf dem main Branch bist
git checkout main

# Revert den Merge-Commit
git revert -m 1 a2a21ea

# Optional: Füge eine aussagekräftige Commit-Nachricht hinzu
git commit --amend -m "Revert: Undo JSON navigation merge (PR #12)

This reverts commit a2a21ea2459f21c0556b63785af2031aff7f5c24.
Reason: [Füge hier den Grund für das Revert ein]"

# Push die Änderungen
git push origin main
```

**Vorteile:**
- ✅ Sicher - behält die Git-Historie bei
- ✅ Kann einfach rückgängig gemacht werden
- ✅ Funktioniert auch wenn andere nach dem Merge committet haben

**Nachteile:**
- ⚠️ Erstellt einen zusätzlichen "Revert"-Commit in der Historie

### Option 2: Git Reset (Nur wenn kein Push erfolgt ist)

⚠️ **WARNUNG:** Verwende diese Option nur, wenn der Merge-Commit noch nicht gepusht wurde oder wenn du sicher bist, dass niemand anderes darauf basierend gearbeitet hat.

```bash
# Gehe zum Commit vor dem Merge zurück
git reset --hard HEAD~1

# Erzwinge einen Push (gefährlich!)
git push --force-with-lease origin main
```

**Vorteile:**
- ✅ Saubere Historie ohne Revert-Commit

**Nachteile:**
- ❌ Sehr gefährlich wenn bereits gepusht
- ❌ Kann die Arbeit anderer zerstören
- ❌ Schwer rückgängig zu machen

### Option 3: Einzelne Dateien manuell zurücksetzen

Falls du nur bestimmte Teile des Merges rückgängig machen möchtest:

```bash
# Einzelne Datei auf den Zustand vor dem Merge zurücksetzen
git checkout HEAD~1 -- path/to/specific/file.tsx

# Mehrere Dateien gleichzeitig
git checkout HEAD~1 -- lib/navigation.ts components/layout/header.tsx

# Commit die Änderungen
git add .
git commit -m "Revert specific files from navigation merge"
git push origin main
```

## Auswirkungen des Reverts

Das Rückgängigmachen des Merges würde folgende Änderungen entfernen:

### Entfernte Funktionen:
- JSON-basierte Hauptnavigation
- Responsive Navigation
- Barrierefreie Navigation
- Neue GitHub Workflows
- Neue Komponenten für Navigation

### Betroffene Dateien (Auswahl):
- `lib/navigation.ts`
- `components/layout/header.tsx`
- `data/buefa_navigation_config.json`
- GitHub Workflow-Dateien
- Verschiedene UI-Komponenten

### Potenzielle Probleme nach dem Revert:
- Mögliche Build-Fehler wenn andere Teile auf die Navigation angewiesen sind
- Fehlende Navigation in der UI
- Broken Links oder fehlende Routen

## Empfohlenes Vorgehen

1. **Backup erstellen:**
   ```bash
   git branch backup-before-revert
   ```

2. **Teste lokal mit Revert:**
   ```bash
   git revert -m 1 a2a21ea --no-commit
   npm run build  # Teste ob alles noch funktioniert
   npm run dev    # Teste die Anwendung
   ```

3. **Wenn alles funktioniert:**
   ```bash
   git commit -m "Revert JSON navigation merge"
   git push origin main
   ```

4. **Falls Probleme auftreten:**
   ```bash
   git reset --hard HEAD  # Macht den Revert rückgängig
   # Analysiere die Probleme und behebe sie einzeln
   ```

## Alternative: Schrittweise Anpassung

Statt eines kompletten Reverts könntest du auch:
- Einzelne problematische Funktionen deaktivieren
- Die Navigation schrittweise anpassen
- Nur bestimmte Dateien auf den alten Zustand zurücksetzen

## Hilfe und Support

Falls du Unterstützung beim Rückgängigmachen benötigst:
1. Erstelle zunächst ein Backup
2. Teste alle Änderungen lokal
3. Dokumentiere den Grund für das Revert
4. Informiere dein Team über die Änderungen

## Fazit

**Für die meisten Fälle wird Option 1 (git revert) empfohlen**, da sie sicher ist und die Git-Historie erhält.