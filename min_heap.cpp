//O(Nlogk + klogk)
#include <iostream>
using namespace std;
void swap(int arr[],int a,int b)
{
    int t=arr[a];arr[a]=arr[b];arr[b]=t;
}
void heapify(int a,int arr[],int n)
{
    int left=2*a+1;
    int right=2*a+2;
    int min=a;
    if(left<n)
    {
    if(arr[min]>arr[left]) 
    min=left;
    }
    if(right<n)
    {if(arr[min]>arr[right]) 
    min=right;}
    if(min!=a) {swap(arr,a,min);
    heapify(min,arr,n);}
}
void heapSort(int arr[],int n)
{int a;//cout<<"okk";
    for(a=(n-2)/2;a>=0;a--){heapify(a,arr,n);}
    
    for(a=n-1;a>=0;a--)
    {
        swap(arr,0,a);heapify(0,arr,a);
    }
}
void printArray(int arr[], int n)
{
	for (int i=0; i<n; ++i)
		cout << arr[i] << " ";
	cout << "\n";
}

void topk(int arr[],int n,int k)
{
    int arr1[k],a;
    for(a=0;a<k;a++)
    {
       arr1[a]=arr[a]; 
    }
   for(a=(k-2)/2;a>=0;a--){heapify(a,arr1,k);}
   for(a=k;a<n;a++)
   {
       if(arr1[0]<arr[a]) {arr1[0]=arr[a];heapify(0,arr1,k);}
   }
   printArray(arr1,k);
}



int main()
{
	int arr[] = {5,2,45,1,32,11,9};
	int n = sizeof(arr)/sizeof(arr[0]);
    //cout<<"okk";
    topk(arr,n,3);
	heapSort(arr, n);

	cout << "Sorted array is \n";
	printArray(arr, n);
	
}
