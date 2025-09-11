import os
import pandas as pd
from argopy import DataFetcher
from langchain_community.document_loaders import PDFPlumberLoader
from langchain.schema import Document

def load_argo_data():
    """Fetch ARGO float data and convert to docs + dataframe."""
    print("Loading ARGO float data...")
    # Example float
    argo_data = DataFetcher().float(6902746).load().data
    df = argo_data.to_dataframe().reset_index()

    # Summarize rows into text
    docs = []
    for _, row in df.iterrows():
        summary = (
            f"Cycle: {row['CYCLE_NUMBER']}, Data Mode: {row['DATA_MODE']}, "
            f"Direction: {row['DIRECTION']}, PRES: {row['PRES']}, PRES_ERROR: {row['PRES_ERROR']}, "
            f"PRES_QC: {row['PRES_QC']}, PSAL: {row['PSAL']}, PSAL_ERROR: {row['PSAL_ERROR']}, "
            f"PSAL_QC: {row['PSAL_QC']}, TEMP: {row['TEMP']}, TEMP_ERROR: {row['TEMP_ERROR']}, "
            f"TEMP_QC: {row['TEMP_QC']}, TIME_QC: {row['TIME_QC']}, "
            f"LATITUDE: {row['LATITUDE']}, LONGITUDE: {row['LONGITUDE']}, TIME: {row['TIME']}"
            f"Platform number={row.get('PLATFORM_NUMBER', '')}"
        )
        docs.append(Document(page_content=summary, metadata={"source": "ARGO"}))

    return df, docs


def load_papers(pdf_folder="backend/data/papers"):
    """Load and split research papers."""
    print("Loading research papers...")
    all_docs = []
    for filename in os.listdir(pdf_folder):
        if filename.lower().endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            loader = PDFPlumberLoader(pdf_path)
            all_docs.extend(loader.load())
    return all_docs
