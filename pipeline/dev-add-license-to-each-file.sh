#!/bin/bash



# exit when LAFTOOLS_ROOT has no value
if [[ "$LAFTOOLS_ROOT" = "" ]]; then
    exit
fi


addLicense(){

cd $1
file_type=$2


git ls-tree -r --name-only $(git rev-parse --abbrev-ref HEAD) "./" | while read file ; do

# date=$(date "+%A, %B %d, %Y")
# day=$(date "+%d")

# if [ "$day" = "01" ] || [ "$day" = "21" ] || [ "$day" = "31" ]; then
#     suffix="st"
# elif [ "$day" = "02" ] || [ "$day" = "22" ]; then
#     suffix="nd"
# elif [ "$day" = "03" ] || [ "$day" = "23" ]; then
#     suffix="rd"
# else
#     suffix="th"
# fi

# t_date=$(echo $date | sed "s/ ${day},/ ${day}${suffix},/")
t_date=$(git log --reverse --format="%aD" -- $file | head -n 1 | awk '{print $1 " " $2 " " $3 " " $4}')

# echo $t_date
# echo "handling the file: $file"

# get ext of file
ext=${file##*.}
# echo "file_type is $file_type"
# echo "file: -3 is ${ext}"

if [ ! -f "$file" ]; then
    # echo "skip the file: $file"
    continue
fi

pDIR=$(dirname "$file")
# echo "pDIR is $pDIR"
if [[ $pDIR == *"node_modules"* ]]; then
    # echo "skip the node_modules"
    continue
fi
if [ ! -d "$pDIR" ]; then
    # echo "skip the file: $file"
    continue
fi

# get full path of file
file_path=$(cd `dirname $file`; pwd)/`basename $file`

# if the file contains example or Example, then continue
if grep -q "example" "$file_path"; then
    # echo "skip the example content"
    continue
fi

if grep -q "Example" "$file_path"; then
    # echo "skip the Example content"
    continue
fi

# check if the file contains "Copyright", if yes then continue
if grep -q "LafTools -" "$file"; then
    # echo "skip the Copyright content"
    continue
fi

# if file contains "node_modules", then quit
if [[ $file == *"node_modules"* ]]; then
    # echo "skip the node_modules"
    continue
fi


if [[ ${ext} == "${file_type}" ]]; then
echo "doing the file process: $file"

cat <<EOF >"${file}.agpl"
// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: $t_date
// Author: $(git log --follow --pretty="format:%an <%ae>" -- "$file" | sort | uniq | sed  's/jerry549@icloud.com/work7z@outlook.com/g' | sed 's/CodeGen ToolBox/LafTools Team/g' | sed -i ':a;N;$!ba;s/\n/ /g' filename)  
// Description: 
// Copyright (C) $(date +%Y) - Present, https://laftools.dev and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

EOF
cat "$file" >> "${file}.agpl"

echo "$file.agpl"
cat "$file.agpl" 
# rm "$file.agpl"
mv "$file.agpl" "$file"

fi

done
}


addLicense "$LAFTOOLS_ROOT" "go"
addLicense "$LAFTOOLS_ROOT/modules" "scss"
addLicense "$LAFTOOLS_ROOT/modules" "tsx"
addLicense "$LAFTOOLS_ROOT/modules" "mjs"