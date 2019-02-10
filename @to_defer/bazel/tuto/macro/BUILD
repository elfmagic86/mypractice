# $ bazel build //macro:file
# $ cat bazel-genfiles/macro/file.txt

genrule(
    name = "file",
    outs = ["file.txt"],

	# https://docs.bazel.build/versions/master/be/general.html#genrule.cmd
	cmd = "echo $(BINDIR) > $@",

	# https://docs.bazel.build/versions/master/be/general.html#genrule.tools
	# tools = [":generator"],

)

# bazel query --output=build //macro:file
# genrule(
  # name = "file",
  # tools = ["//macro:generator"],
  # outs = ["//macro:file.txt"],
  # cmd = "echo $(BINDIR) > $@",
# )
