import nltk

modules = ['punkt', 'gutenberg', 'brown', 'wordnet']

for module in modules:
    try:
        print("Installing {0}...".format(module))
        nltk.download(module)
        print("{0} successfully installed.".format(module))
    except Exception as e:
        print("Failed to install {0}: {1}".format(module, str(e)))
