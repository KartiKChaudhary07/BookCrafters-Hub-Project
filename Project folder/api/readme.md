### Install

**For Windows**

```
cd <ROOT_PATH>/api
py -3 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m pip install --upgrade pip
flask run --host=0.0.0.0 --port=5000 --debug
```

**For Mac**

```
cd <ROOT_PATH>/api
python3 -m venv .venv
. .venv/bin/activate
which python
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
flask run --host=0.0.0.0 --port=5000 --debug
```

# Iterate and install requirements.txt
https://stackoverflow.com/questions/22250483/stop-pip-from-failing-on-single-package-when-installing-with-requirements-txt
For windows
```
FOR /F %k in (requirements.txt) DO pip install %k
```
For Mac
```
cat requirements.txt | xargs -n 1 pip install
```

- Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

#### Pip

- Add new packages to `requirements.txt`

```
pip freeze > requirements.txt
```

### Naming Reference
Backend Server  => Command Prompt/Terminal Python flask run
Backend Code => VS Code API/Flask
Frontend Server => Command Prompt/Terminal React npm start
Frontend Code => VS Code Web/React
Web => Chrome/Browser

**🔥 When we commit our code**
1. Commit
2. Pull it from development
3. Raise pull request
4. Merge
5. Pull it from development

**🔥 Before start coding**
1. Pull it from development
