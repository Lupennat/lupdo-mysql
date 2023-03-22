# Changelog

All notable changes to this project from 1.0.0 forward will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2023-03-22

### Changed

-   Update to Lupdo ^3.3.0

## [1.3.1] - 2023-03-19

### Changed

-   Mysql statement `prepare` do not real prepare statement on mysql, prepare does not emit error anymore. Error will be raised only on execution.

## [1.3.0] - 2023-02-03

### Changed

-   The `host` option now also accepts a list of `host:port`; the pool will generate the connection using a random host from the list.

## [1.2.1] - 2023-01-20

### Added

-   `createMysqlPdo` function exported to better typing mysqlOptions

## [1.2.0] - 2023-01-10

### Changed

-   Update to Lupdo ^3.0.0

## [1.1.0] - 2023-01-08

### Fixed

-   Type Casting

### Changed

-   Updated to Lupdo v2.1.0.

## [1.0.3] - 2022-12-29

### Fixed

-   Kill connection also `removeAllListeners()`

## [1.0.2] - 2022-12-28

### Changed

-   Update to Lupdo ^2.0.0

## [1.0.1] - 2022-12-28

### Added

-   support for mysql57

## [1.0.0] - 2022-12-27

First Public Release On Npm
