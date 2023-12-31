from flask import Flask, render_template, send_file, redirect, request, flash, Response, get_flashed_messages
from jinja2.exceptions import TemplateNotFound


__version__ = '0.1'

__supported_languages__ = [
	'en-us'
]


app = Flask(__name__.split('.')[0])
app.config['SECRET_KEY'] = '08c228c4408845f48c579a04a000b218'




# Default redirects

@app.route('/')
def root():
	return redirect('/en-us/index.html')

@app.route('/<lang>')
def lang(lang):
	return redirect(f'/{lang}/index.html')

# Endpoints

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



# Misc endpoints

@app.context_processor
def load_jinja_defaults():
	return {
		'version': __version__,
		'avl_languages': __supported_languages__    # list of supported languages
	}

@app.route('/favicon.ico')
def favicon():
	return send_file('static/assets/favicon-temp.png')

@app.route('/flash-messages')
def flash_messages():
	"""
	with_categories
	catagory
	"""
	kwargs = dict(request.args)
	return get_flashed_messages(**kwargs)

# Error Handlers

@app.errorhandler(TemplateNotFound)
def TemplateNotFoundHandler(e):
	flash("Page doesn't exist. Redirecting to homepage.", 'error')
	return redirect('/')

@app.errorhandler(404)
def pageNotFoundHandler(e):
	flash("Page doesn't exist. Redirecting to homepage.", 'error')
	return redirect('/')



if __name__ == '__main__':
	app.run(
		host='0.0.0.0',
		port=5000,
		debug=True
	)