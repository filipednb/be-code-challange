import { messages } from './messages'
import axios from 'axios'

async function main() {
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        let endpoint = 'shipment'
        if (message.type === 'ORGANIZATION') {
            endpoint = 'organization'
        }

        const url = `http://localhost:3000/${endpoint}`;
        try {
            await axios.post(url, message)
        } catch (error: any) {
            console.error('erro', url, error.response.config)
        }

    }
}

main()