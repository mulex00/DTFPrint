import React, {useState, Component} from 'react'
import './Dashboard.css'
import Display from './Display'
import Settings from './Settings'

class Dashboard extends Component {
    state = {
        tshirtView: 'A',
        tshirtColor: '00',
        tshirtText: 'Írj ide valamit',
        tshirtFontSize: "1vw",
        tshirtTextAlign: "left",
        tshirtTextXPos: 0,
        tshirtTextYPos: 0,
        tshirtFontColor: 'black',
        tshirtImgA: '',
        tshirtImgSizeA: 100,
        tshirtImgXPosA: 0,
        tshirtImgYPosA: 0,
        tshirtAIPromptA:'',
        generatingImgA: false,
        tshirtImgB: '',
        tshirtImgSizeB: 100,
        tshirtImgXPosB: 0,
        tshirtImgYPosB: 0,
        tshirtAIPromptB:'',
        generatingImgB: false,
    };
    changeTshirtView = (e) => {
        this.setState({tshirtView: e.target.value});
    }
    changeTshirtColor = (e) => {
        this.setState({tshirtColor: e.target.id});
    }
    changeTshirtText = (e) => {
        this.setState({tshirtText: e.target.value});
    }
    changeTshirtFontSize = (e) => {
        this.setState({tshirtFontSize: e.target.value})
    }
    changeTshirtTextAlign = (e) => {
        this.setState({tshirtTextAlign: e.target.value})
    }
    changeTshirtTextXPos = (e) => {
        this.setState({tshirtTextXPos: e.target.value})
    }
    changeTshirtTextYPos = (e) => {
        this.setState({tshirtTextYPos: e.target.value})
    }
    changeTshirtFontColor = (e) => {
        this.setState({tshirtFontColor: e.target.value})
    }
    changeTshirtImageA = (e) => {
        this.setState({tshirtImgA: URL.createObjectURL(e.target.files[0])});
    }
    changeTshirtImageSizeA = (e) => {
        this.setState({tshirtImgSizeA: e.target.value})
    }
    changeTshirtImageXPosA = (e) => {
        this.setState({tshirtImgXPosA: e.target.value})
    }
    changeTshirtImageYPosA = (e) => {
        this.setState({tshirtImgYPosA: e.target.value})
    }
    changeTshirtAIImagePromptA = (e) => {
        this.setState({tshirtAIPromptA: e.target.value})
    }
    handleAIImageA = async (type) => {
        if(this.state.tshirtAIPromptA=='') return alert("Kérlek adj meg egy képleírást!");
        try{
            console.log(typeof(this.state.tshirtAIPromptA))
            this.setState({generatingImgA: true});
            const response = await fetch ('https://dtf-print.onrender.com/api/v1/dalle', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: this.state.tshirtAIPromptA
            })
            })
            const data = await response.json();
            const imageUrl = data.photo;
            console.log(data)
            this.setState({tshirtImgA: imageUrl});
        }catch(error){
            alert(error)
        }finally{
            this.setState({generatingImgA: false});
        }    
    }
    changeTshirtImageB = (e) => {
        this.setState({tshirtImgB: URL.createObjectURL(e.target.files[0])});
    }
    changeTshirtImageSizeB = (e) => {
        this.setState({tshirtImgSizeB: e.target.value})
    }
    changeTshirtImageXPosB = (e) => {
        this.setState({tshirtImgXPosB: e.target.value})
    }
    changeTshirtImageYPosB = (e) => {
        this.setState({tshirtImgYPosB: e.target.value})
    }
    changeTshirtAIImagePromptB = (e) => {
        this.setState({tshirtAIPromptB: e.target.value})
    }
    handleAIImageB = async (type) => {
        if(this.state.tshirtAIPromptB=='') return alert("Kérlek adj meg egy képleírást!");
        try{
            console.log(typeof(this.state.tshirtAIPromptB))
            this.setState({generatingImgB: true});
            const response = await fetch ('https://dtf-print.onrender.com/api/v1/dalle', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: this.state.tshirtAIPromptB
            })
            })
            const data = await response.json();
            const imageUrl = data.photo;
            console.log(data)
            this.setState({tshirtImgB: imageUrl});
        }catch(error){
            alert(error)
        }finally{
            this.setState({generatingImgB: false});
        }    
    }

    render(){
    return (
        <div className='dashboard-container'>
        <h1>Dashboard (work in progress)</h1>
        <div className='dashboard-wrapper'>
        <div className='dashboard-component'>    
        <Display display={this.state}/>
        </div>
        <div className='dashboard-component'>
        <Settings
        settings={this.state}
        tshirt_view={this.changeTshirtView} 
        tshirt_color={this.changeTshirtColor}
        tshirt_text={this.changeTshirtText}
        tshirt_fontsize={this.changeTshirtFontSize}
        tshirt_text_align={this.changeTshirtTextAlign}
        tshirt_text_XPos={this.changeTshirtTextXPos}
        tshirt_text_YPos={this.changeTshirtTextYPos}
        tshirt_fontcolor={this.changeTshirtFontColor}
        uploadImageA={this.changeTshirtImageA}
        uploadImageSizeA={this.changeTshirtImageSizeA}
        uploadImageXPosA={this.changeTshirtImageXPosA}
        uploadImageYPosA={this.changeTshirtImageYPosA}
        AIImagePromptA={this.changeTshirtAIImagePromptA}
        GenerateAIImageA={this.handleAIImageA}
        uploadImageB={this.changeTshirtImageB}
        uploadImageSizeB={this.changeTshirtImageSizeB}
        uploadImageXPosB={this.changeTshirtImageXPosB}
        uploadImageYPosB={this.changeTshirtImageYPosB}
        AIImagePromptB={this.changeTshirtAIImagePromptB}
        GenerateAIImageB={this.handleAIImageB}

        />
        </div>
        </div>
        </div>
    )
    }
}

export default Dashboard