import os
import json

BASE_DIR = "sounds"
sounds = []

for category in os.listdir(BASE_DIR):
    category_path = os.path.join(BASE_DIR, category)

    if not os.path.isdir(category_path):
        continue

    for filename in os.listdir(category_path):
        if not (filename.lower().endswith(".mp3") or filename.lower().endswith(".wav") or filename.lower().endswith(".flac")):
            continue

        dot_extension_index = len(filename) - 1 - filename[::-1].index(".")  # find last dot for extension
        remove_extension = filename[:dot_extension_index]  # remove extension
        separated_name = remove_extension.split(" - ")

        # validate that we have at least artist and song
        if len(separated_name) < 2:
            print(f"Skipping '{filename}' in '{category_path}' - filename format should be 'Artist - Song Title - Source (optional).ext'")
            continue
        
        if category_path == os.path.join(BASE_DIR, "sfx"):
            print(f"categoryPath: {category_path}")
            artist = separated_name[0]
            song = separated_name[1]
            id = separated_name[1].lower().replace(" ", "-")
            source = separated_name[2] if len(separated_name) > 2 else None

            sounds.append({
                "id": id,
                "artist": artist,
                "label": song,
                "source": source,
                "file": f"{BASE_DIR}/{category}/{filename}",
                "category": category
            })
            continue

        artist = separated_name[0]
        song = separated_name[1]
        id = separated_name[1].lower().replace(" ", "-")
        label = f"{artist} - {song}"
        source = separated_name[2] if len(separated_name) > 2 else None

        sounds.append({
            "id": id,
            "artist": artist,
            "label": label,
            "source": source,
            "file": f"{BASE_DIR}/{category}/{filename}",
            "category": category
        })

with open("sounds.json", "w", encoding="utf-8") as f:
    json.dump(sounds, f, indent=2, ensure_ascii=False)

print("✅ sounds.json generated successfully!")
