SOURCE_FILE=index.js
MINIFIED_FILE=spreadmap-toy.min.js

default: minify
pre-commit:

minify: $(MINIFIED_FILE) clean

$(MINIFIED_FILE): $(SOURCE_FILE)
	curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
		--data-urlencode "js_code@$<" \
		http://closure-compiler.appspot.com/compile \
		> $@

$(SOURCE_FILE):
	git checkout master -- $(SOURCE_FILE) && \
	git reset

clean:
	rm $(SOURCE_FILE)
