# Scan Adoption

## Introduction

This is a [github action](https://github.com/features/actions)
that scans the codebase of a project for tracking metrics of library usage and adoption.
The action will scan the codebase for imports of libraries.



## Usage

### Default

```yaml
steps:
  - uses: adevinta/spark-action-scan-adoption
    with:
      datadog-metrics: 'true'
      organisation-name: ${{ secrets.ORGANISATION_NAME }}
      authorisation_user: ${{ secrets.AUTHORISATION_USER }}
      authorisation_password: ${{ secrets.AUTHORISATION_PASSWORD }}
```
It is suggested to be ran on a schedule basis, for example twice a day.
<details>
<summary>
Show Example
</summary>

```yaml
name: mirror
on:
  workflow_dispatch:
  schedule:
    - cron: "0 7,19 * * *" # every day at 7am and 7pm
```
Use [this webapp](https://crontab.guru/#0_7,19_*_*_*) to get the proper cron syntax configuration.

</details>




### Inputs
