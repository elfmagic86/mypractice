def file_generator(name, arg, visibility=None):
  native.genrule(
    name = name,
    outs = [name + ".txt"],

	# todo `% arg`
    cmd = "$(location //02:test-generator) %s > $@" % arg,
    # cmd = "$(location :test-generator) %s > $@" % arg,
    # cmd = "$(location test-generator) %s > $@" % arg,
    # cmd = "/home/kang/Desktop/Project_Mine/mypractice/@to_defer/bazel/tuto/macro/02/test_generator.sh %s > $@" % arg,
  tools = ["//02:test-generator"],
    visibility = visibility,
  )
