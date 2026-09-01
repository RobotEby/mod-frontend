# Migrating the default branch from `master` to `main`

This repository's default branch is currently `master`. Migrating it requires
Git commands against the repository, a default-branch change on GitHub and
coordination with collaborators; it cannot be completed through documentation
changes alone.

## 1. Rename the branch locally and push it

```bash
git checkout master
git pull origin master
git branch -m master main
git push -u origin main
```

This pushes a new `main` branch to GitHub. At this point both `master` and
`main` exist on the remote, with identical history.

## 2. Change the default branch on GitHub

1. Go to the repository on GitHub → **Settings → Branches**.
2. Under "Default branch", click the switch icon and select `main`.
3. Confirm the change.

Do this **before** deleting `master`, so open pull requests and CI don't
briefly point at a branch that no longer exists.

## 3. Update branch protection rules (if any)

If `master` had branch protection rules (required reviews, required status
checks, etc.), recreate them for `main` under **Settings → Branches → Branch
protection rules**. Protection rules are not automatically copied when you
rename a branch's role as default.

## 4. Update any external references

Check and update, if they exist:

- CI/CD configuration that explicitly targets `master` (this repo's own
  `.github/workflows/ci.yml` already triggers on both `main` and `master`, so
  it keeps working during the transition).
- Deployment configuration (Vercel/Netlify/etc.) pointing at `master` as the
  production branch.
- Any badges, links, or documentation referencing
  `.../blob/master/...` URLs.

## 5. Delete the old branch

Once you've confirmed the default branch switch, CI, and any deployments are
working against `main`:

```bash
git push origin --delete master
git branch -d master   # locally, if you still have it
```

## 6. Tell collaborators

Anyone with a local clone should run:

```bash
git checkout master
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```

---

**Status of this migration for this repository:** not yet performed. This
document describes the exact commands to run. The repository still uses
`master` as its default branch, and the migration must be coordinated with
the GitHub settings and collaborators before the old branch is removed.
