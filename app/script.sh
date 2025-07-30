if [ "${PRODUCTION}" = "false" ]; then
	yarn dev:watch;
else
	yarn build; yarn preview --host 0.0.0.0 --port $PORT;
fi