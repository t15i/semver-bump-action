# Semantic Version Bumper V1
This pretty simple action automatically bump the version number according to [Semantic Versioning](https://semver.org) based on the labels of pull requests merged between two specified Git refs (specially tags).
## What's new
Please refer to the [release page](https://github.com/t15i/semver-bump-action/releases) for the latest release notes.
## Usage
```yaml
- uses: t15i/semver-bump-action@v1.0.0
  with:
    # Base and head refs of comparison.
    #
    # Expected format is "BASE...HEAD".
    # This is a '...'-separated value of base and head refs of comparison.
    # [Learn more about comparisons](https://docs.github.com/en/rest/commits/commits#compare-two-commits)
    #
    # This input is *required*. If you do not provide it, the action will
    # fail during the input validation step.
    basehead: ''

    # Labels that determine MAJOR, MINOR and PATCH changes.
    #
    # Expected format is "major.minor.patch".
    # This is a dot-separated value of labels corresponding to the desired change type.
    # It is also possibe to
    # * omit specific labels (e.g., "major..patch", ".minor.patch").
    # * skip unnecessary parts entirely (e.g., "major" instead of "major..").
    #
    # Default: 'major.minor.patch'
    labels: ''

    # Version that will be bumped based on the detected labels.
    #
    # Expected format is "x.x.x".
    #
    # Default: '0.0.0'
    version: ''

    # Personal access token (PAT) with sufficient permissions to query
    # commits, pull requests and labels in the repository.
    #
    # Default: ${{ github.token }}
    token: ''
```
## Recommended permissions
When using the semver bumper action in your GitHub Actions workflow, it is recommended to set the following `GITHUB_TOKEN` permissions to ensure proper functionality:
```yaml
permissions:
  contents: read
```
