import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    const t = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 20)
    return () => clearTimeout(t)
  }, [pathname])

  return null
}

export default ScrollToTop