export
	JS_FILES=index.js test.js package.json

default: npm-i lint
pre-commit: default

npm-i:
	@[ -d node_modules ] || npm install

include $(shell find makefiles -name '*.mk' | sort)
