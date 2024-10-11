from root import create_app


api = create_app()

if __name__ == "__main__":
    api.run(debug=True)
