<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DocumentsController extends Controller
{
    //

    public function search($id, $keyword=null){
        $customerDocuments = Customer::where(['id'=>$id])->with([
            'documents' => function ($myWithQuery) use ($keyword) {
                $myWithQuery->where('parent_id', '0');
                if($keyword && $keyword!=""){
                    $myWithQuery->where('file_name', 'like', '%'.$keyword.'%');
                }
            }
        ])->first();
        return response()->json($customerDocuments);
    }
    public function gallery($id, $keyword=null)

    {



//        $customerDocuments = Customer::where(['id'=>$id])->with('documents')->first();
        $customerDocuments = Customer::where(['id'=>$id])->with([
            'documents' => function ($myWithQuery) use ($keyword) {
                $myWithQuery->where('parent_id', '0');
            }
        ])->first();

//        dd($customerDocuments);

        return Inertia::render('Documents/Gallery', ['documents' => $customerDocuments, 'customer_id'=>$id]);

    }
    public function getfiles($id){
        $customerDocs = CustomerDocument::where(['id'=>$id])->with('customer','children')->first()->toArray();
        return response()->json($customerDocs);
    }
    public function files($id){
        $customerDocs = CustomerDocument::where(['id'=>$id])->with('customer','children')->first()->toArray();
//        dd($customerDocs);
        return Inertia::render('Documents/FilesGallery', ['documents' => $customerDocs]);
    }
    public function index()

    {

        $customerDocuments = Customer::with('documents')->get()->toArray();

        return Inertia::render('Documents/Index', ['documents' => $customerDocuments]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function create($customer_id)

    {
        $customers = Customer::all();
        return Inertia::render('Documents/CreateFolder', ['customers' => $customers, 'customer_id' => $customer_id]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function createfile(Request $request)

    {
        // 'customer_id', 'file_name','description', 'parent_id', 'is_folder', 'file_type','creator_id'

//        echo "2";
        $file = request()->file('uploadfile');
        $filename = time().".".$file->getClientOriginalExtension();
        $path=$file->storeAs('uploads', $filename, 'public');
//        echo $path = $file->store('uploads', 'public');


//        $imageName = "hello".time().'.'.$request->uploadfile->getClientOriginalExtension();
//        $filename = "myfilanem.".$file->getClientOriginalExtension();
//        echo $filename;
//        $file->move(public_path("/"), $filename);

//        dd($request->all());

        Validator::make($request->all(), [
            'file_name' => ['required'],
            'customer_id'=>['required'],
            'is_folder' => ['required'],
        ])->validate();

        $data = $request->all();
        $data['file_type']=$file->getClientOriginalExtension();
        $data['file_size']=$file->getSize();
        $data['file_path']=$path;
        $data['creator_id']=Auth::id();


        CustomerDocument::create($data);
        return response()->json(['success'=>'true']);

    }
    function downloadfile($id)
    {
        $document = CustomerDocument::where('id',$id)->pluck('file_path')->first();
        $file = public_path()."/".$document;
//        dd($file);
        return response()->download($file);
    }
    public function store(Request $request)

    {
        // 'customer_id', 'file_name','description', 'parent_id', 'is_folder', 'file_type','creator_id'
//        dd($request->all());
        Validator::make($request->all(), [
            'file_name' => ['required'],
            'description' => ['required'],
            'customer_id'=>['required'],
            'is_folder' => ['required'],
        ])->validate();

        $data = $request->all();
        $data['file_type']="pdf";
        $data['creator_id']=Auth::id();


        CustomerDocument::create($data);


        return redirect()->route('documents.gallery',[$request->customer_id]);

    }


    /**
     * Write code on Method
     *
     * @return response()
     */

    public function edit(CustomerDocument $customerDocument)

    {

        return Inertia::render('Documents/Edit', [

            'document' => $customerDocument

        ]);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function update($id, Request $request)

    {

        Validator::make($request->all(), [

            'name' => ['required'],

            'phone' => ['required'],
            'email' => ['required'],
            'address' => ['required'],

        ])->validate();


        CustomerDocument::find($id)->update($request->all());

        return redirect()->route('documents.index');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy($id)
    {
        CustomerDocument::find($id)->delete();
        return redirect()->route('documents.index');
    }
}
