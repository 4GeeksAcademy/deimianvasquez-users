const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			users:[]
		},
		actions: {
			saveUser: async (user)=>{
				let store = getStore();

				try {
					let response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method:"POST",
						body: user
					})
					
					return response.status

				} catch (error) {
					console.log(error)
				}
			},
			getAllUsers:async()=>{
				let store = getStore();

				try {
					let response = await fetch(`${process.env.BACKEND_URL}/user`)
					if(response.ok){
						let data = await response.json()
						setStore({
							users:data
						})
					}

				} catch (error) {
					console.log(error)
				}
			}
			
		}
	};
};

export default getState;
