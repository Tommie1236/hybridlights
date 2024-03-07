from flask import Flask, render_template, send_file, redirect, request, flash, Response, get_flashed_messages, jsonify
from jinja2.exceptions import TemplateNotFound
import secrets


version_context = (0, 1, "dev")
__version__ = '-'.join(str(x) for x in version_context)

__supported_languages__ = [
	'nl-nl'
] # since we're NOT in england or the united states, i suggest we keep our site native dutch.


app = Flask(__name__.split('.')[0])
app.secret_key = secrets.token_hex(24)


def pflash(*args, **kwargs):
	print(*args, **kwargs)
	flash(*args, **kwargs)

# Default redirects

@app.route('/')
def root():
	return redirect('/nl-nl/index.html')

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

@app.route('/<lang>/contact.html', methods=['GET', 'POST'])
def contact(lang):
	match request.method:
		case 'GET':
			return render_template(f'{lang}/contact.html', lang=lang)
		case 'POST':
			pflash('Thank you for your message!', 'success')
			return Response(status=200)



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


# Error Handlers

@app.errorhandler(TemplateNotFound)
def TemplateNotFoundHandler(e):
	pflash("Page doesn't exist.\nRedirecting to homepage.", 'error')
	return redirect('/')

@app.errorhandler(404)
def pageNotFoundHandler(e):
	pflash("Page doesn't exist.\nRedirecting to homepage.", 'error')
	return redirect('/')



if __name__ == '__main__':
	app.run(
		host='0.0.0.0',
		port=5000,
		debug=True
	)