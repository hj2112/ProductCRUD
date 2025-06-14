import React, { useState } from 'react'
import { Box, Heading, HStack, Image, Text, IconButton, useColorModeValue, useToast, VStack, Input, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '@/store/product';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'


const ProductCard = ({ product }) => {
    const [updateProduct, setUpdateProduct] = useState(product)
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updatedProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async (pid, updateProduct) => {
        const { success, message } = await updatedProduct(pid, updateProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{ transform: "translate(-5px)", shadow: 'xl' }} bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update  Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updateProduct.name || ""}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })} />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updateProduct.price || ""}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updateProduct.image || ""}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updateProduct)}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard