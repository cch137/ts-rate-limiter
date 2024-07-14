import os
import shutil

shutil.rmtree('dist', ignore_errors=True)
os.system('tsc')
try: shutil.copyfile('.npmignore', 'dist/.npmignore')
except: pass
try: shutil.copyfile('README.md', 'dist/README.md')
except: pass
shutil.copyfile('package.json', 'dist/package.json')

os.system(' && '.join([
  'cd dist/',
  'npm publish --access public',
]))
os.remove('dist/package.json')
