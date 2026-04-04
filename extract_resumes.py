import os
import PyPDF2

def extract_pdf(path):
    text = ""
    try:
        with open(path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        text = str(e)
    return text

resumes_dir = r"e:\Portfolio\public\assets\resumes"
with open(r"e:\Portfolio\resumes_text.txt", "w", encoding="utf-8") as out_file:
    for f in os.listdir(resumes_dir):
        if f.endswith('.pdf'):
            out_file.write(f"\n\n=== {f} ===\n")
            out_file.write(extract_pdf(os.path.join(resumes_dir, f)))

print("Finished extracting.")
