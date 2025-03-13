import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = this.getFullScreenHeight()
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>
        {
            this.width = window.innerWidth
            this.height = this.getFullScreenHeight()
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })

        // Handle viewport changes on mobile (when URL bar shows/hides)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
                this.height = this.getFullScreenHeight()
                this.trigger('resize')
            })
        }
    }

    /**
     * Get the full screen height accounting for mobile browsers
     * @returns {number} The full screen height
     */
    getFullScreenHeight()
    {
        // Use visual viewport height if available (better for mobile)
        if (window.visualViewport) {
            return window.visualViewport.height
        }
        
        // Fallback to window inner height
        return window.innerHeight
    }
}