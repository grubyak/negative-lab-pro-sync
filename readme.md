# negative-lab-pro-sync (nlpx)

### problem

`negative lab pro`, designed to process negative scans, stores its adjustments directly into the lightroom catalog. These settings can be lost when files are moved or a catalog becomes corrupted.

### solution

`nlpx` is a two‑way sync tool for `negative lab pro` and the `lightroom classic` catalog.

It synchronizes sidecar files (`.nlp.json`), allowing you to:

- restore negative adjustments back into the catalog at any time
- move or reorganize files without losing nlp data
- avoid keeping positive copies in lightroom, since they can be re‑created with the same settings on demand

## limitations

- to allow moving files freely, synchronization is based on **filenames**
- each photo must therefore have a unique name (this is best practice anyway)
- suggested filename format: `YYYYMMDD-HHMM-RR-NNN.CR3`
- negatives must use the `.CR3` extension
- **important** — before syncing data back into the catalog, make sure desired files have (at least default) `negative lab pro` adjustments
  - select desired photos and run `negative lab pro`
  - if any entries are present — good, they are ready for sync
  - otherwise — accept the dialog to create default entries, which will be overridden during sync

### installation

```zsh
$ pnpm add -g @grby/nlpx
```

### usage

**Make a backup of your lightroom catalog before syncing data back into it.**

```zsh
$ nlpx
```

```zsh
$ nlpx --update-sidecar --catalog=<path> [--go] [--verbose] [--all]
$ nlpx --update-catalog --catalog=<path> [--go] [--verbose]
```

### sync: catalog -> sidecars

```zsh
# close lightroom to ensure all adjustments are written to the catalog
```

```zsh
$ cd ~/photos/album-123/
$ nlpx --update-sidecar --catalog=/Users/xyz/a/b/c/my-catalog.lrcat --verbose --all
# validate whether everything looks good
```

```zsh
$ nlpx --update-sidecar --catalog=/Users/xyz/a/b/c/my-catalog.lrcat --verbose --all --go
$ ls -1
aaabbbccc.CR3
aaabbbccc.nlp.json
```

### sync: sidecars -> catalog

```zsh
# make a copy of your catalog and keep negative lab pro plugin closed!
```

```zsh
$ cd ~/photos/album-123/
$ nlpx --update-catalog --catalog=/Users/xyz/a/b/c/my-catalog.lrcat --verbose
# validate whether everything looks good
```

```zsh
$ nlpx --update-catalog --catalog=/Users/xyz/a/b/c/my-catalog.lrcat --verbose --go
```

### warning

This software comes with no warranty — use at your own risk.  
Always make a backup of your `lightroom catalog` before syncing data back.  
Tested only with `negative lab pro` 3.0.2 and `lightroom classic` 14.3.1

### coffee

If you find this useful, consider [buying me a coffee](https://coff.ee/grubyak).

<a href="https://coff.ee/grubyak">
  <img src="bmc.png" alt="buy me a coffee" width="200"/>
</a>
