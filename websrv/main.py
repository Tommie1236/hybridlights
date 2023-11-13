from flask import Flask, render_template, send_file, redirect


__version__ = '0.1'


app = Flask(__name__)
app.config['SECTET_KEY'] = '08c228c4408845f48c579a04a000b218'

@app.context_processor
def load_jinja_defaults():
	return {
		'version': __version__,
		'avl_languages': ['en-us', 'nl-nl']     # list of supported languages
	}





@app.route('/favicon.ico')
def favicon():
	return send_file('static/assets/favicon-temp.png')



@app.route('/')
def root():
	return redirect('/en-us/index.html')

@app.route('/<lang>')
def lang(lang):
	return redirect(f'/{lang}/index.html')


@app.route('/<lang>/index.html')
def index(lang):
	return render_template(f'{lang}/index.html', lang=lang)

@app.route('/<lang>/about-us.html')
def about_us(lang):
	return render_template(f'{lang}/aboutus.html', lang=lang)
	
@app.route('/<lang>/pricing.html')
def pricing(lang):
	return render_template(f'{lang}/pricing.html', lang=lang)

@app.route('/<lang>/contact.html')
def contact(lang):
	return render_template(f'{lang}/contact.html', lang=lang)







if __name__ == '__main__':
	app.run(
		host='0.0.0.0',
		port=5000,
		debug=True
	)