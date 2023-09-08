import os
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents import AgentExecutor



os.environ["OPENAI_API_KEY"] = "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"
db = SQLDatabase.from_uri("sqlite:///C:/Users/sandhya_shanbhag/Desktop/database/chinook.db")
toolkit = SQLDatabaseToolkit(db=db)

agent_executor = create_sql_agent(
    llm=OpenAI(temperature=0),
    toolkit=toolkit,
    verbose=True
)
agent_executor.run("List the tables present in database")
#agent_executor.run("Describe the playlisttrack table")
#agent_executor.run("Describe the playlistsong table")
#agent_executor.run("Show the total number of tracks in each playlist. The Playlist name should be included in the result.")
#agent_executor.run("Who are the top 3 best selling artists?")