import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const StateCarousel = () => {
    const [states, setState] = useState<{name: String; selected: boolean}[]>([]);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleDots = 5;

    useEffect(()=>{
        axios.get("http://localhost:3000/api/states")
        .then((response) => setState(response.data.map((name:string)=>({
            name, selected:false}))))         
        .catch(error => console.log(error));
    }, []);
 
    const scrollToIndex = (index: number) => {
        if(scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                animated: true,
                x: index * (boxWidth + boxMargin * 2)
            });
        }
    };

    //This function handles clicking on  < > of carousel
    const handleArrowPress = (direction: 'left' | 'right') => {
        const newIndex = 
            direction == 'left' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex >=0 && newIndex < states.length) {
            setCurrentIndex(newIndex);
            scrollToIndex(newIndex);
        }
    }

    //This function handles funcionality if another states is selected 
    //when already one of the the state was selected 
    const handleBoxPress = (index: number) => {
        const updatedStates = states.map((state, i) => ({
            ...state, 
            selected: i === index ? !state.selected: false,
        }));
        setState(updatedStates);
    }

    const boxWidth = 150
    const boxMargin = 10;
    const dotSize = 8;

    //states.slice logic ensures correct scrolling when dots are pressed
    return (
    <View style={{backgroundColor: '#f7f7f5'}}>
        <ScrollView 
            horizontal
            ref={(ref)=> (scrollViewRef.current = ref)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(event)=>{
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / (boxWidth + boxMargin * 2));
                setCurrentIndex(index);
            }}
            style = {{marginTop: 5, marginBottom: 5, backgroundColor: '#f7f7f5'}}
        >
            {states.map((state, index) => (
            <TouchableOpacity 
                key={index} 
                onPress={()=> {
                    handleBoxPress(index);
                    console.log(`Pressed ${state.name}`)
                    }}
            >
            <View
                style = {{
                    margin:boxMargin,
                    marginTop:120,
                    padding:20,
                    height:80,
                    width: boxWidth,
                    borderRadius: 20,
                    shadowColor: '#e3e3e1',
                    backgroundColor: state.selected ? '#ebebe9' : 'white',
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}                   
            >   
            <Text style = {{
                        fontSize: 12,
                        fontFamily: 'Arial',
                        textAlign: 'center',
                        marginTop: 12
                    }}>
                        {state.name}
                    </Text>
            </View>
            </TouchableOpacity>                
            ))}
        </ScrollView>
        <View
            style = {{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2,
                marginBottom: 650,
                margin: 5
            }}
        >
            <TouchableOpacity onPress={()=> handleArrowPress('left')}>
                <Text style={{fontWeight:'700', padding: 5}}>{'<'}</Text>
            </TouchableOpacity>
            {states.slice(currentIndex, currentIndex + visibleDots).map((_, index) => (
                <TouchableOpacity
                    key = {index}
                    style = {{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize / 2,
                        backgroundColor: index === currentIndex % visibleDots ? 'black' : 'gray',
                        margin: 5
                    }}
                    onPress={()=> {
                        setCurrentIndex(currentIndex + index);
                        scrollToIndex(currentIndex + index);
                    }}
                />
            ))}
            <TouchableOpacity onPress={()=> handleArrowPress('right')}>
                <Text style={{fontWeight:'700', padding: 5}}>{'>'}</Text>
            </TouchableOpacity>           
        </View>
    </View>
    )
};

export default StateCarousel;