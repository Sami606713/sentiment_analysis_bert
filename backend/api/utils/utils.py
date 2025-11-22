from transformers import BertForSequenceClassification, BertTokenizer

def load_model():
    # Define the path where the model and tokenizer are saved
    model_path = 'model/'

    # Load the model
    loaded_model = BertForSequenceClassification.from_pretrained(model_path)

    print(f"Fine-tuned model and tokenizer loaded successfully from {model_path}.")
    return loaded_model


def load_tokenizer():
    model_path = 'model/'
    loaded_tokenizer = BertTokenizer.from_pretrained(model_path)
    return loaded_tokenizer


def predict_sentiment(text):
    model = load_model()
    tokenizer = load_tokenizer()
    
    # Preprocess and tokenize the new review texts
    inputs = tokenizer(text, truncation=True, padding='max_length', max_length=256, return_tensors='pt')

    # Make predictions
    outputs = model(**inputs)
    logits = outputs.logits
    predictions = logits.argmax(dim=-1)

    # Map prediction to sentiment label (assuming 0 for negative, 1 for positive)
    sentiment_label = "positive" if predictions.item() == 1 else "negative"
    return sentiment_label