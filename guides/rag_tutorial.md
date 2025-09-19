# Essential RAG System Tutorial

![Essential Logo](images/essential.png)

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Configuration](#configuration)
5. [Application Architecture](#application-architecture)
6. [Usage Guide](#usage-guide)
7. [Features](#features)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Usage](#advanced-usage)

## Overview

**Essential** is a sophisticated Retrieval-Augmented Generation (RAG) system built with Streamlit that transforms long documents into concise, understandable summaries. It leverages advanced AI technologies to help users quickly grasp key information from their document collections.

### Key Benefits
- **Time-Saving**: Quickly extract insights from lengthy documents
- **Intelligent Search**: Context-aware document retrieval using vector similarity
- **Domain-Specific**: Specialized prompts for Data Vault, Airflow, and VaultSpeed topics
- **Multi-Format Support**: Handles PDF, DOCX, and TXT files
- **Persistent Storage**: Documents are stored in Qdrant vector database for reuse

## Prerequisites

Before getting started, ensure you have:

### System Requirements
- Python 3.8 or higher
- Minimum 4GB RAM
- Internet connection for API access

### API Access Required
1. **Groq API Key**: For LLM inference (free tier available)
2. **Qdrant Cloud Account**: For vector storage (free tier available)

## Installation & Setup

### Step 1: Clone or Download the Project
```bash
git clone <repository-url>
cd essential-rag-system
```

### Step 2: Install Dependencies
```bash
pip install streamlit
pip install python-dotenv
pip install langchain-groq
pip install langchain-community
pip install langchain
pip install PyPDF2
pip install python-docx
pip install qdrant-client
pip install sentence-transformers
```

### Step 3: Create Environment File
Create a `.env` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
```

## Configuration

### Getting API Keys

#### 1. Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key to your `.env` file

#### 2. Qdrant Setup
1. Go to [Qdrant Cloud](https://cloud.qdrant.io/)
2. Create a free account
3. Create a new cluster
4. Note your cluster URL and API key
5. Add these to your `.env` file

### Streamlit Secrets (Alternative)
Instead of `.env`, you can use Streamlit secrets:

Create `.streamlit/secrets.toml`:
```toml
GROQ_API_KEY = "your_groq_api_key_here"
QDRANT_URL = "your_qdrant_cluster_url"
QDRANT_API_KEY = "your_qdrant_api_key"
```

## Application Architecture

### Core Components

#### 1. DocumentProcessor
Handles file processing for multiple formats:
- **PDF**: Uses PyPDF2 for text extraction
- **DOCX**: Uses python-docx for Word documents
- **TXT**: Direct text file reading

#### 2. VectorStoreManager
Manages document embeddings and storage:
- **Text Splitting**: Chunks documents into manageable pieces (1000 chars with 200 overlap)
- **Embeddings**: Uses HuggingFace's `all-MiniLM-L6-v2` model (free)
- **Vector Storage**: Persists in Qdrant cloud database

#### 3. SimplifiedRAGSystem
Orchestrates the retrieval and generation:
- **Domain Detection**: Automatically identifies Data Vault, Airflow, or VaultSpeed queries
- **Context Retrieval**: Finds relevant document chunks
- **Response Generation**: Uses Groq's Llama 3.1 8B model

## Usage Guide

### Step 1: Launch the Application
```bash
streamlit run essentia.py
```

### Step 2: Upload Documents
1. Use the sidebar file uploader
2. Select multiple files (PDF, DOCX, TXT)
3. Click "📤 Process Documents"
4. Wait for processing completion

### Step 3: Configure Settings
In the sidebar:
- **Response Mode**: Choose between "Overview" or "Deep Dive"
- **Show Sources**: Toggle to display source documents

### Step 4: Start Querying
1. Type your question in the chat input
2. The system will automatically detect the domain
3. Receive contextual responses with source citations

## Features

### 1. Multi-Format Document Support
- **PDF Files**: Automatic text extraction from PDF documents
- **Word Documents**: Support for .docx files
- **Text Files**: Plain text file processing

### 2. Intelligent Document Chunking
- Recursive text splitting for optimal chunk sizes
- Maintains context across chunk boundaries
- Configurable chunk size and overlap

### 3. Domain-Specific Intelligence
The system automatically detects and optimizes for:

#### Data Vault 2.0
- Hubs, Links, and Satellites
- Business keys and modeling
- Staging layer practices

#### Apache Airflow
- DAG design and orchestration
- Pipeline management
- Workflow scheduling

#### VaultSpeed
- Code generation automation
- Deployment strategies

### 4. Response Modes

#### Overview Mode
- Concise bullet-point summaries
- Key concepts highlighted
- Quick practical recommendations

#### Deep Dive Mode
- Comprehensive technical analysis
- Implementation details
- Best practices and challenges
- Integration considerations

### 5. Persistent Storage
- Documents stored in Qdrant vector database
- Survives application restarts
- Efficient similarity search

## Troubleshooting

### Common Issues

#### 1. API Key Errors
**Error**: "Missing API keys"
**Solution**: 
- Verify `.env` file exists and contains correct keys
- Check key formatting (no extra spaces)
- Ensure keys are valid and active

#### 2. Qdrant Connection Issues
**Error**: "Qdrant connection failed"
**Solution**:
- Verify cluster URL format: `https://your-cluster.qdrant.tech`
- Check API key permissions
- Ensure cluster is active

#### 3. Document Processing Errors
**Error**: "Error processing PDF/DOCX"
**Solution**:
- Verify file is not corrupted
- Check file permissions
- Try with a different file format

#### 4. Memory Issues
**Error**: Out of memory during processing
**Solution**:
- Process fewer documents at once
- Reduce chunk size in configuration
- Close other memory-intensive applications

### Performance Optimization

#### 1. Document Management
- Regularly clear unused documents
- Process documents in batches
- Use appropriate chunk sizes for your content

#### 2. Query Optimization
- Be specific in your questions
- Use domain-relevant keywords
- Try different response modes for different needs

## Advanced Usage

### Custom Configuration

#### Modify Text Splitting Parameters
```python
self.text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1500,  # Increase for longer contexts
    chunk_overlap=300,  # Increase overlap for better continuity
    length_function=len
)
```

#### Change Embedding Model
```python
self.embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2"  # Higher quality model
)
```

#### Adjust LLM Parameters
```python
self.llm = ChatGroq(
    groq_api_key=groq_key,
    model="llama-3.1-8b-instant",
    temperature=0.3,  # Lower for more focused responses
    max_tokens=2000   # Increase for longer responses
)
```

### Integration Examples

#### 1. Batch Document Processing
```python
# Process multiple files programmatically
files = ["doc1.pdf", "doc2.docx", "doc3.txt"]
for file_path in files:
    with open(file_path, "rb") as f:
        # Process using the document processor
        pass
```

#### 2. Custom Query Processing
```python
# Add custom domain detection
def detect_custom_domain(query):
    if "custom_keyword" in query.lower():
        return "custom_domain"
    return "general"
```

### Best Practices

#### 1. Document Organization
- Group related documents together
- Use descriptive filenames
- Maintain consistent document formats

#### 2. Query Formulation
- Start with broad questions, then narrow down
- Include relevant domain keywords
- Reference specific concepts when known

#### 3. Performance Management
- Monitor document count in sidebar
- Clear documents periodically
- Use appropriate response modes

### Security Considerations

#### 1. API Key Management
- Never commit API keys to version control
- Use environment variables or secrets management
- Rotate keys regularly

#### 2. Document Privacy
- Ensure sensitive documents are handled appropriately
- Consider local deployment for sensitive data
- Review Qdrant's data retention policies

## Sample Project
```
import streamlit as st
import tempfile
import os
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime
import base64
from dotenv import load_dotenv

# Simplified imports - removed CrewAI
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

# Document processing imports
import PyPDF2
import docx
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

# Qdrant imports
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from langchain_community.vectorstores import Qdrant

# Load environment variables
load_dotenv(override=True)

# Configure page
st.set_page_config(
    page_title="essential",
    page_icon="📑",
    layout="centered",
    initial_sidebar_state="expanded"
)

def get_api_key(key_name: str) -> str:
    """Get API key from environment variables or Streamlit secrets"""
    env_value = os.getenv(key_name)
    if env_value and env_value.strip():
        return env_value.strip()
    
    try:
        if hasattr(st, 'secrets') and key_name in st.secrets:
            return str(st.secrets[key_name]).strip()
    except:
        pass
    return ""

# Get API keys
groq_key = get_api_key("GROQ_API_KEY")
qdrant_url = get_api_key("QDRANT_URL")
qdrant_api_key = get_api_key("QDRANT_API_KEY")

# Validate required keys
missing_keys = []
if not groq_key:
    missing_keys.append("GROQ_API_KEY")
if not qdrant_url:
    missing_keys.append("QDRANT_URL")
if not qdrant_api_key:
    missing_keys.append("QDRANT_API_KEY")

if missing_keys:
    st.error(f"Missing API keys: {', '.join(missing_keys)}")
    st.info("Add these to your .env file or Streamlit secrets")
    st.stop()

@dataclass
class ChatMessage:
    role: str
    content: str
    timestamp: datetime
    sources: Optional[List[str]] = None

class DocumentProcessor:
    """Handles document loading and processing"""
    
    @staticmethod
    def extract_text_from_pdf(file_path: str) -> str:
        try:
            with open(file_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                return text
        except Exception as e:
            st.error(f"Error processing PDF: {e}")
            return ""
    
    @staticmethod
    def extract_text_from_docx(file_path: str) -> str:
        try:
            doc = docx.Document(file_path)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            st.error(f"Error processing DOCX: {e}")
            return ""
    
    @staticmethod
    def extract_text_from_txt(file_path: str) -> str:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except Exception as e:
            st.error(f"Error processing TXT: {e}")
            return ""
    
    @classmethod
    def process_uploaded_file(cls, uploaded_file) -> tuple[str, str]:
        with tempfile.NamedTemporaryFile(delete=False, suffix=uploaded_file.name) as tmp_file:
            tmp_file.write(uploaded_file.getvalue())
            tmp_path = tmp_file.name
        
        filename = uploaded_file.name
        file_ext = filename.lower().split('.')[-1]
        
        try:
            if file_ext == 'pdf':
                text = cls.extract_text_from_pdf(tmp_path)
            elif file_ext == 'docx':
                text = cls.extract_text_from_docx(tmp_path)
            elif file_ext == 'txt':
                text = cls.extract_text_from_txt(tmp_path)
            else:
                st.error(f"Unsupported file type: {file_ext}")
                text = ""
            return filename, text
        finally:
            os.unlink(tmp_path)

class VectorStoreManager:
    """Simplified vector store management"""
    
    def __init__(self):
        self.vectorstore = None
        self.qdrant_client = None
        self.collection_name = "essentia_docs"
        
        # Text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        
        # Free embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        self._initialize_qdrant()
        self._load_existing_vectorstore()
    
    def _initialize_qdrant(self):
        """Initialize Qdrant connection"""
        try:
            self.qdrant_client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
            collections = self.qdrant_client.get_collections()
            
            # Check if collection exists
            collection_exists = any(c.name == self.collection_name for c in collections.collections)
            
            if not collection_exists:
                self.qdrant_client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=384, distance=Distance.COSINE)
                )
                
            else:
                pass
                
        except Exception as e:
            st.error(f"Qdrant connection failed: {e}")
            self.qdrant_client = None
    
    def _load_existing_vectorstore(self):
        """Load existing vectorstore if available"""
        try:
            if self.qdrant_client:
                self.vectorstore = Qdrant(
                    client=self.qdrant_client,
                    collection_name=self.collection_name,
                    embeddings=self.embeddings
                )
                
                collection_info = self.qdrant_client.get_collection(self.collection_name)
                doc_count = collection_info.points_count
                
                if doc_count > 0:
                    st.session_state.documents_loaded = True
                    st.session_state.document_count = doc_count
                    
        except Exception as e:
            st.warning(f"Could not load existing documents: {e}")
    
    def add_documents(self, documents: List[Document]) -> bool:
        """Add documents to vector store"""
        try:
            if not self.qdrant_client:
                st.error("Qdrant not initialized")
                return False
            
            # Split documents
            chunks = self.text_splitter.split_documents(documents)
            if not chunks:
                st.error("No text chunks created")
                return False
            
            # Create or update vectorstore
            if self.vectorstore is None:
                self.vectorstore = Qdrant.from_documents(
                    chunks,
                    self.embeddings,
                    url=qdrant_url,
                    api_key=qdrant_api_key,
                    collection_name=self.collection_name,
                    force_recreate=False
                )
            else:
                self.vectorstore.add_documents(chunks)
            
            st.success(f"Added {len(chunks)} document chunks")
            return True
            
        except Exception as e:
            st.error(f"Error adding documents: {e}")
            return False
    
    def similarity_search(self, query: str, k: int = 5) -> List[Document]:
        """Search for similar documents"""
        if self.vectorstore:
            try:
                return self.vectorstore.similarity_search(query, k=k)
            except Exception as e:
                st.error(f"Search error: {e}")
        return []
    
    def clear_documents(self) -> bool:
        """Clear all documents"""
        try:
            if self.qdrant_client:
                self.qdrant_client.delete_collection(self.collection_name)
                self.qdrant_client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=384, distance=Distance.COSINE)
                )
                self.vectorstore = None
                st.success("Cleared all documents")
                return True
        except Exception as e:
            st.error(f"Error clearing documents: {e}")
        return False

class SimplifiedRAGSystem:
    """Simplified RAG system without CrewAI - using direct LangChain"""
    
    def __init__(self, vector_store_manager: VectorStoreManager):
        self.vector_store = vector_store_manager
        self.llm = None
        self._initialize_llm()
    
    def _initialize_llm(self):
        """Initialize the language model"""
        try:
            self.llm = ChatGroq(
                groq_api_key=groq_key,
                model="llama-3.1-8b-instant",
                temperature=0.7,
                max_tokens=1500
            )
            
        except Exception as e:
            st.error(f"LLM initialization failed: {e}")
    
    def _create_domain_specific_prompt(self, query: str, mode: str) -> PromptTemplate:
        """Create domain-specific prompts based on query content"""
        
        query_lower = query.lower()
        
        # Detect domain based on keywords
        is_data_vault = any(keyword in query_lower for keyword in 
                           ['data vault', 'hub', 'link', 'satellite', 'business key', 'staging'])
        is_airflow = any(keyword in query_lower for keyword in 
                        ['airflow', 'dag', 'pipeline', 'workflow', 'schedule'])
        is_vaultspeed = any(keyword in query_lower for keyword in 
                           ['vaultspeed', 'automation', 'code generation'])
        
        # Create appropriate system prompt
        if is_data_vault:
            system_role = "You are a Data Vault 2.0 expert with deep knowledge of hubs, links, satellites, and data modeling best practices."
        elif is_airflow:
            system_role = "You are an Apache Airflow specialist with expertise in DAG design, orchestration, and pipeline management."
        elif is_vaultspeed:
            system_role = "You are a VaultSpeed automation expert specializing in code generation and deployment strategies."
        else:
            system_role = "You are a technical expert who can analyze and explain complex documentation clearly."
        
        if mode == "Overview":
            instruction = """Provide a concise overview with:
• Key points in bullet format
• Brief explanations of important concepts  
• Practical recommendations if applicable
Keep it focused and easy to understand."""
        else:
            instruction = """Provide a detailed analysis with:
• Comprehensive explanation of relevant concepts
• Technical implementation details
• Best practices and recommendations
• Potential challenges and solutions
• Integration considerations
Provide thorough technical depth while maintaining clarity."""
        
        template = f"""{system_role}

Context from documents:
{{context}}

Question: {{question}}

Instructions: {instruction}

Answer:"""
        
        return PromptTemplate(
            template=template,
            input_variables=["context", "question"]
        )
    
    def generate_response(self, query: str, mode: str = "Overview") -> tuple[str, List[str]]:
        """Generate response using simple RAG approach"""
        if not self.llm:
            return "LLM not initialized. Please check your Groq API key.", []
        
        try:
            # Get relevant documents
            relevant_docs = self.vector_store.similarity_search(query, k=5)
            
            if not relevant_docs:
                return "No relevant documents found. Please upload documents first.", []
            
            # Extract sources
            sources = list(set([doc.metadata.get('source', 'Unknown') for doc in relevant_docs]))
            
            # Create context from documents
            context = "\n\n".join([
                f"Source: {doc.metadata.get('source', 'Unknown')}\n{doc.page_content}"
                for doc in relevant_docs
            ])
            
            # Create domain-specific prompt
            prompt = self._create_domain_specific_prompt(query, mode)
            
            # Create chain
            chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.vector_store.vectorstore.as_retriever(search_kwargs={"k": 5}),
                chain_type_kwargs={"prompt": prompt},
                return_source_documents=True
            )
            
            # Get response
            result = chain({"query": query})
            
            return result["result"], sources
            
        except Exception as e:
            st.error(f"Error generating response: {e}")
            return f"Error: {e}", []

class SimplifiedChatbot:
    """Main chatbot class"""
    
    def __init__(self):
        self.vector_store = VectorStoreManager()
        self.rag_system = SimplifiedRAGSystem(self.vector_store)
    
    def load_documents(self, uploaded_files) -> bool:
        if not uploaded_files:
            return False
        
        documents = []
        progress_bar = st.progress(0)
        
        for i, uploaded_file in enumerate(uploaded_files):
            filename, text = DocumentProcessor.process_uploaded_file(uploaded_file)
            
            if text.strip():
                doc = Document(
                    page_content=text,
                    metadata={"source": filename, "upload_time": datetime.now().isoformat()}
                )
                documents.append(doc)
            
            progress_bar.progress((i + 1) / len(uploaded_files))
        
        if documents:
            success = self.vector_store.add_documents(documents)
            if success:
                st.session_state.documents_loaded = True
                st.session_state.document_count = self._get_document_count()
                return True
        
        return False
    
    def _get_document_count(self) -> int:
        try:
            if self.vector_store.qdrant_client:
                collection_info = self.vector_store.qdrant_client.get_collection(self.vector_store.collection_name)
                return collection_info.points_count
        except:
            pass
        return 0
    
    def clear_documents(self) -> bool:
        success = self.vector_store.clear_documents()
        if success:
            st.session_state.documents_loaded = False
            st.session_state.document_count = 0
        return success
    
    def generate_response(self, query: str, mode: str = "Overview") -> tuple[str, List[str]]:
        return self.rag_system.generate_response(query, mode)
def load_image_as_base64(image_path: str) -> str:
    """Load image and convert to base64 - supports both local and git paths"""
    # Define possible paths
    local_path = f"D:\\MOOD\\CODE\\{image_path}"
    git_path = image_path
    
    # Try local path first, then git path
    paths_to_try = [local_path, git_path]
    
    for path in paths_to_try:
        try:
            if os.path.exists(path):
                with open(path, "rb") as img_file:
                    return base64.b64encode(img_file.read()).decode()
        except Exception as e:
            continue
    
    # If no paths work, show warning but don't error
    st.warning(f"Image not found at either: {local_path} or {git_path}")
    return ""

def render_sidebar():
    """Render sidebar controls"""
    with st.sidebar:
        book_img_path = "images/essential.png"
        book_b64 = load_image_as_base64(book_img_path)
        
        if book_b64:
            st.markdown(f"""
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="data:image/png;base64,{book_b64}" 
                        style="width: 140px; height: auto; margin-bottom: 10px;" />
                    <p style="margin: 0; font-style: italic; color: #666; font-size: 14px;">
                        Simplified RAG System
                    </p>
                </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown("# 📚 Essential")
            st.markdown("*Powered by Langchain*")
        st.markdown("---")
        
        # Status indicators
        st.markdown(f"**Groq LLM:** {'✅ Ready' if groq_key else '❌ Missing'}")
        st.markdown(f"**Qdrant:** {'✅ Connected' if qdrant_url and qdrant_api_key else '❌ Missing'}")
        st.markdown("---")
        
        # Document management
        st.markdown("### 📁 Documents")
        
        if st.session_state.get('documents_loaded', False):
            doc_count = st.session_state.get('document_count', 0)
            st.success(f"✅ {doc_count} documents loaded")
            
            if st.button("🗑️ Clear Documents"):
                if st.session_state.chatbot.clear_documents():
                    st.rerun()
        
        uploaded_files = st.file_uploader(
            "Upload Documents",
            type=['pdf', 'docx', 'txt'],
            accept_multiple_files=True,
            help="Upload your documents for analysis"
        )
        
        if uploaded_files:
            if st.button("📤 Process Documents"):
                with st.spinner("Processing documents..."):
                    if st.session_state.chatbot.load_documents(uploaded_files):
                        st.success("Documents processed!")
                        st.rerun()
        
        # Settings
        st.markdown("### ⚙️ Settings")
        response_mode = st.selectbox(
            "Response Mode",
            ["Overview", "Deep Dive"],
            help="Choose response detail level"
        )
        
        show_sources = st.toggle("Show Sources", value=True)
        
        return response_mode, show_sources

def main():
    """Main application"""
    
    # Initialize session state
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    if 'documents_loaded' not in st.session_state:
        st.session_state.documents_loaded = False
    if 'chatbot' not in st.session_state:
        st.session_state.chatbot = SimplifiedChatbot()
    
    # Main header
    quickquery_img_path = "images/essential.png"
    quickquery_b64 = load_image_as_base64(quickquery_img_path)
    
    if quickquery_b64:
        st.markdown(f'''
            <div class="main-header" style="margin-bottom: 20px;">
                <div style="display: flex; align-items: flex-end;">
                    <img src="data:image/png;base64,{quickquery_b64}" 
                        style="width: 240px; height: auto; margin-right: 20px;" />
                    <h1 style="margin: 0; font-size: 15px; font-weight: bold;">
                        Essential turns long documents into concise, understandable summaries, saving time and making it easier to grasp the key information.
                    </h1>
                </div>
            </div>
        ''', unsafe_allow_html=True)
    else:
        st.markdown('''
        <div class="main-header">
            <h1>📑 Essential turns long documents into concise, understandable summaries, saving time and making it easier to grasp the key information.</h1>
        </div>
        ''', unsafe_allow_html=True)
    
    # Sidebar
    response_mode, show_sources = render_sidebar()
    
    # Available topics
    st.markdown("### 📋 List of Topics Available for Search")
    st.markdown("""
    - Data Vault 2.0 Fundamentals
    - Hubs, Links, and Satellites  
    - Business Keys and Surrogate Keys
    - Staging Layer Best Practices
    - PIT & Bridge Tables
    - Apache Airflow Orchestration
    - VaultSpeed Automation
    """)
    st.markdown("---")
    
    # Chat interface
    for message in st.session_state.chat_history:
        if message.role == "user":
            st.chat_message("user").write(message.content)
        else:
            with st.chat_message("assistant"):
                st.write(message.content)
                if show_sources and message.sources:
                    st.markdown("**Sources:**")
                    for source in message.sources:
                        st.markdown(f"• {source}")
    
    # Input
    if st.session_state.documents_loaded:
        if user_input := st.chat_input("Ask about your documents..."):
            # Add user message
            user_msg = ChatMessage(role="user", content=user_input, timestamp=datetime.now())
            st.session_state.chat_history.append(user_msg)
            
            # Generate response
            with st.spinner("Analyzing..."):
                response, sources = st.session_state.chatbot.generate_response(user_input, response_mode)
            
            # Add assistant message
            assistant_msg = ChatMessage(
                role="assistant", 
                content=response, 
                timestamp=datetime.now(),
                sources=sources if show_sources else None
            )
            st.session_state.chat_history.append(assistant_msg)
            
            st.rerun()
    else:
        st.info("Upload documents in the sidebar to start chatting!")
    
    # Clear chat
    if st.session_state.chat_history:
        if st.button("🗑️ Clear Chat"):
            st.session_state.chat_history = []
            st.rerun()

if __name__ == "__main__":

    main()
```

## Conclusion

Essential RAG System provides a powerful, user-friendly interface for document analysis and question-answering. By combining modern AI technologies with intuitive design, it enables users to efficiently extract insights from their document collections.

For additional support or feature requests, refer to the project repository or create an issue with detailed information about your use case.