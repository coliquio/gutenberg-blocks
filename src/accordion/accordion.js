/**
 * Accordion Wrapper
 */

// Setup the block
const { Component } = wp.element;


/**
 * Create a Accordion wrapper Component
 */
export default class Accordion extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
            <div className={ this.props.className }>
                { this.props.children }
            </div>
		);
	}
}