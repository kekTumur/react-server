import React, {Component} from 'react';

const withDataDetails = (View, getData, getImageUrl) => {
    return class extends Component {
        state = {
            data: null,
            loading: false,
            image: null
        };
    
        componentDidMount() {
            this.updateItem();
        }
    
        componentDidUpdate(prevProps) {
            if (this.props.itemId !== prevProps.itemId) {
                this.updateItem();
            }
        }
    
        itemLoaded = data => {
            this.setState({
                loading: false,
                data,
                image: getImageUrl(data)
            });
        }
    
        updateItem = () => {
            this.setState({
                loading: true
            });
    
            const {itemId} = this.props;
            if (!itemId) {
                return;
            }
            getData(itemId)
                .then(this.itemLoaded);
                
        }

        render() {
            const {data, image} = this.state;

            if (!data) {
                return <div className="alert alert-light" role="alert">Select item from list</div>
            }

            return (
                <View {...this.props} data={data} image={image} />
            );
        }
    }
}

export default withDataDetails;
