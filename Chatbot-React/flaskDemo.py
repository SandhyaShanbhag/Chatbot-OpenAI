
#C:/Users/sandhya_shanbhag/Desktop/database/Storables Dataset
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import csv
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI

app = Flask(__name__)
os.environ["OPENAI_API_KEY"] = "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"
path="D:/ChatBot_Gradio/Agency_healthcare/"
CORS(app)

@app.route('/query', methods=['POST'])
def process_query():
    data = request.get_json()
    # print(data)
    # Process the query
    response = CSV(data['query'],data['file'])
    return response

def CSV(prompt,file):
    # print(prompt)
     # give your csv file path
    file_path =path+'/'+file
    with open(file_path, 'r', encoding='utf-8') as f:
        csv_reader = csv.reader(f)
        raw_text = ''
        for row in csv_reader:
            raw_text += ','.join(row) + '\n'
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    texts = text_splitter.split_text(raw_text)
    embeddings = OpenAIEmbeddings()
    docsearch = FAISS.from_texts(texts, embeddings)
    chain = load_qa_chain(OpenAI(), chain_type="stuff")
    query = prompt
    docs = docsearch.similarity_search(query)
    output = chain.run(input_documents=docs, question=query)
    return output

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})
    # print(request.files)
    file.save(path)  # Replace with your desired save location and filename

    return jsonify({'message': 'File uploaded successfully'})

@app.route('/files', methods=['GET'])
def getFiles():
    # print("Here")
    options = os.listdir(path)
    return options
if __name__ == '__main__':
    app.run()
