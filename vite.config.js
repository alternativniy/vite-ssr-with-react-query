import react from "@vitejs/plugin-react-swc"
import ssr from 'vite-plugin-ssr/plugin'

export default {
  plugins: [react(), ssr({ prerender: false })]
}
