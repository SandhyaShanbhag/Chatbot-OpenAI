#Agency health research quality
import os
import shutil

import gradio as gr
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import ElasticVectorSearch, Pinecone, Weaviate, FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
import csv
from PyPDF2 import PdfReader

os.environ["OPENAI_API_KEY"] = "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"
path="D:\\ChatBot_Gradio\\Agency_healthcare\\"


def splitsearch(raw_text,prompt):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    texts = text_splitter.split_text(raw_text)
    embeddings = OpenAIEmbeddings()
# "FAISS.from_texts" is a function call that processes a list of text documents and returns a matrix of vector embeddings that can be used for similarity search or clustering.
    docsearch = FAISS.from_texts(texts, embeddings)
# The term "QA chain" could refer to a pipeline or series of steps involved in processing a question and generating an answer.
# The load_qa_chain function from the OpenAI API loads a pre-trained question-answering model based on the specified chain_type parameter.
# In this case, the chain_type is set to "stuff", which is not a specific model but rather a general-purpose QA chain that is trained on a variety of topics and domains.
    chain = load_qa_chain(OpenAI(), chain_type="stuff")
    query = prompt
    docs = docsearch.similarity_search(query)
    output = chain.run(input_documents=docs, question=query)
    return output


def CSV(options,prompt):

    file_path = path.replace('\\','/')+"/"+options
    with open(file_path, 'r') as f:
        csv_reader = csv.reader(f)
        raw_text = ''
        for row in csv_reader:
            raw_text += ','.join(row) + '\n'
    '''text_splitter = CharacterTextSplitter(
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
    output = chain.run(input_documents=docs, question=query)'''
    output = splitsearch(raw_text,prompt)
    return output

def PDF(options,prompt):

    reader = PdfReader(path.replace('\\','/')+"/"+options)
    raw_text = ''
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            raw_text += text
    output = splitsearch(raw_text, prompt)
    return output

history=[]
options = os.listdir(path)

def dropdown_callback(options,prompt,clicked):
    if not clicked:
        return None
    global history
    print("Options:"+options+" prompt:"+prompt)
    extension=os.path.splitext(options)[1]
    if(extension=='.pdf'):
        result = PDF(options,prompt)
    elif(extension=='.csv'):
        result = CSV(options, prompt)
    else:
        return "Wrong File Selected"
    history.append((prompt, result))
    # Format chat history as HTML
    history_html = ""
    unique_history = list(set(history))  # keep only unique prompts and results
    for i, (p, r) in enumerate(unique_history):
        history_html += f"<p><strong>You:</strong> {p}</p><p><strong>Bot:</strong> {r}</p>"
    chat_html = history_html
    #if result:
        #chat_html += f"<p><strong>You:</strong> {prompt}</p><p><strong>Bot:</strong> {result}</p>"
    # Return the HTML-formatted chat
    return chat_html


def uploadFile(file):#only for csv

    file_path = file.name
    file_name=file_path.split("\\")[-1]
    target= path + file_name
    shutil.copy(file_path,target)



with gr.Blocks() as demo:
    gr.Markdown("Compendium of U.S. Health Systems, 2018")
    with gr.Tab("Upload CSV file"):
        file = gr.inputs.File(label="Upload file")
        button=gr.Button("Upload")
        button.click(uploadFile,file)
    # gr.Markdown("Upload File")
    with gr.Tab("Select file"):
        with gr.Column():
            #options = os.listdir(path)
            dropdown_input = gr.inputs.Dropdown(choices=options, label="Select your file Type", default="None")
            prompt = gr.inputs.Textbox(label="Write Your Query")
            button = gr.Button("Submit")
            output = gr.outputs.HTML(label="Chat")
            button.click(dropdown_callback, [dropdown_input, prompt, button],output)

demo.launch()

#hospital linkage
#Provide me with the hospital name, street address, city, state, and ZIP code for compendium hospital id CHSP00007127
