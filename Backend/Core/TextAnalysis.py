'''Data cleaning will take place so that input can be given for anylsis'''
import re
import string
import unicodedata

import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")
STOPWORDS = set(stopwords.words("english"))

def clean_txt(txt:str) ->str:

    txt =unicodedata.normalize("NFKD",txt).encode("ascii","ignore").decode("utf-8","ignore")
    txt=txt.lower()
    txt=re.sub()


