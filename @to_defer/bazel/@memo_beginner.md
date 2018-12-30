beginner
===

- bazel extension
  - Bazel extensions are files ending in .bzl. Use the load statement to import a symbol from an extension.
    `load("//foo/bar:file.bzl", "some_library")`

- By definition, every package contains a BUILD file, which is a short program. BUILD files are evaluated using an imperative language, Starlark.
https://github.com/bazelbuild/starlark/

===================================================

- 구조
https://docs.bazel.build/versions/master/build-ref.html#workspaces

  - Workspace
    - 외부 프로젝트의 WORKSPACE는 대상 프로젝트의 WORKSPACE에 정의되어야함
    외부 프로젝트 의존성이없다면 빈파일이될것

      - java case: https://docs.bazel.build/versions/master/generate-workspace.html


  - Packages
    - A package is a collection of related files and a specification of the dependencies among them.
    - A package is defined as a directory containing a file named BUILD or BUILD.bazel
    - Package names, //package-name:...

  - Tagets
    - A package is a container. 
      The elements of a package are called targets. Most targets are one of two principal kinds, files and rules. Additionally, there is another kind of target, package groups, but they are far less numerous
      - Files: Source files, Generated files (특정한룰로 빌드툴이)
      - rule

    - Package groups are sets of packages whose purpose is to limit accessibility of certain rules

    - Target names, //...:target-name

  - Labels
    - All targets belong to exactly one package.
      The name of a target is called its label, and a typical label in canonical form
      looks like this: //my/app/main:app_binary

  - Rules
    - Every rule has a name, specified by the name attribute, of type string. The name must be a syntactically valid target name
    - The srcs attribute present in many rules has type "list of label"; its value, if present, is a list of labels, each being the name of a target that is an input to this rule.
    - type
      - *_binary
      - *_test
      - *_library

- 의존성
  - In fact, in the context of builds, there are two dependency graphs, the graph of actual dependencies and the graph of declared dependencies. Most of the time, the two graphs are so similar that this distinction need not be made, but it is useful for the discussion below.

  - case
    - Dependencies on other Bazel projects
      - local_repository, git_repository or http_archive
      - valid WORKSPACE names: _ (valid) - (invalid)
        path가 아닌 name룰

    - Dependencies on non-Bazel projects
      - Rules prefixed with new_ (e.g., new_local_repository, new_git_repository and new_http_archive )

    - Dependencies on external packages
      - 메이븐의존성일경우: maven_jar 

  - fetch
  By default, external dependencies are fetched as needed during bazel build. If you would like to disable this behavior or prefetch dependencies, use bazel fetch.

- 명령
  - clean
  Note that running bazel clean will not actually delete the external directory. To remove all external artifacts, use bazel clean --expunge.


======================
- This directed acyclic graph over targets is called the "target graph" or "build dependency graph", and is the domain over which the Bazel Query tool operates.
