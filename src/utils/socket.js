import { BASE_URL } from "./constant";
import io from "socket.io-client"

export function createSocketConnection(){
    return io(BASE_URL)
}