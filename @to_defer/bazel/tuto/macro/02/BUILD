load("//02:generator.bzl", "file_generator")


sh_binary(
    name = "test-generator",
    srcs = ["test_generator.sh"],
)

file_generator(
    name = "file",
    arg = "some_arg",
)


# --------------
# $ bazel query --output=build //macro/02:all

# INFO: Invocation ID: fd83bf0c-3368-4e2d-80c1-24300415820c
# # /home/kang/Desktop/Project_Mine/mypractice/@to_defer/bazel/tuto/m
# acro/02/BUILD:9:1
# genrule(
  # name = "file",
  # generator_name = "file",
  # generator_function = "file_generator",
  # generator_location = "macro/02/BUILD:9",
  # tools = ["//macro/02:test-generator"],
  # outs = ["//macro/02:file.txt"],
  # cmd = "$(location test-generator) some_arg > $@",
# )

# # /home/kang/Desktop/Project_Mine/mypractice/@to_defer/bazel/tuto/m
# acro/02/BUILD:4:1
# sh_binary(
  # name = "test-generator",
  # srcs = ["//macro/02:test_generator.sh"],
# )
