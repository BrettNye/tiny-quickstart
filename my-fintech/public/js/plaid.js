
    const createLinkToken = async () => {
        const res = await fetch("/api/plaid/create_link_token");
          const data = await res.json();
          const linkToken = data.link_token;
          localStorage.setItem("link_token", linkToken);
          return linkToken;
    }

    const handler = Plaid.create({
        token: await createLinkToken(),
          onSuccess: async (publicToken, metadata) => {
            console.log(metadata)
            // Grab Metadata
            /* 
              {
                type,
                user_id,
                link_session_id,
                request_id,
                error_type,
                error_code,
                status
              }
            */
            await fetch("/api/plaid/exchange_public_token", {
              method: "POST",
              body: JSON.stringify({ public_token: publicToken }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            await getBalance();
          },
          onEvent: (eventName, metadata) => {
            console.log("Event:", eventName);
            console.log("Metadata:", metadata);
          },
          onExit: (error, metadata) => {
            console.log(error, metadata);
          },
        });

        // Start Link when button is clicked
        const linkAccountButton = document.getElementById("link-account");
        linkAccountButton.addEventListener("click", (event) => {
          handler.open();
        });

         // Retrieves balance information
      const getBalance = async function () {
        const response = await fetch("/api/data", {
          method: "GET",
        });
        const data = await response.json();

        //Render response data
        const pre = document.getElementById("response");
        pre.textContent = JSON.stringify(data, null, 2);
        pre.style.background = "#F6F6F6";
      };

      // Check whether account is connected
      const getStatus = async function () {
        const account = await fetch("/api/is_account_connected");
        const connected = await account.json();
        if (connected.status == true) {
          getBalance();
        }
      };

      getStatus();