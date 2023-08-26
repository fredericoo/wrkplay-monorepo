#!/bin/zsh

# Specify the folder to loop over
input="./input"
output="output"


# Loop over all files in the folder
for file in $input/*; do
  # Get the filename without the path
  filename=$(basename "$file")
  
  # Generate the output filename
  output_filename="$(echo "${filename%.*}" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"
  output_path="$output/$output_filename"
  
  # Invoke the python script with the filename and output file name
  echo "Subsetting $file..."
  fonttools subset "$file" --output-file="$output_path" --unicodes='*' --layout-features=ss03,ss04,tnum,case
  
  # Compress the subset file with woff2_compress
  echo "Compressing $output_filename..."
  ./woff2_compress "$output_path"
done

find "$output" -type f -not -name '*.woff2' -delete