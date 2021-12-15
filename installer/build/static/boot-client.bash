#pm2 host

pm2 list
cd env
pm2 start --name fn_kernel vm.js -i -1
cd ../frontend
pm2 start node_modules/react-scripts/scripts/start.js --name fn_gui