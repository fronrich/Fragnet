#pm2 host

pm2 list
cd env
pm2 start --name fn_kernel vm.mjs
cd ../frontend
pm2 start node_modules/react-scripts/scripts/start.js --name fn_gui


printf "press 't' to quit"
pm2 monit

while : ; do
read -n 1 k <&1
if [[ $k = t ]] ; then
printf "\nQuitting from the program\n"
pm2 delete fn_kernel
pm2 delete fn_gui
break

fi
done